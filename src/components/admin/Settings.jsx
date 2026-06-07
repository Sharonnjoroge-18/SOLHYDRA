import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { adminAPI } from "../../api";
import "./Settings.css";

export default function Settings() {
  const { user, logout } = useAuth();

  const [site, setSite] = useState({ name: "", email: "", url: "", tagline: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const [account, setAccount] = useState({
    ownerName: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
  });
  const [accountSaved, setAccountSaved] = useState(false);

  useEffect(() => {
    adminAPI.getSettings()
      .then((data) => {
        setSite({
          name: data.site_name || data.name || "",
          email: data.contact_email || data.email || "",
          url: data.site_url || data.url || "",
          tagline: data.tagline || "",
        });
      })
      .catch(() => setError("Could not load settings."))
      .finally(() => setLoading(false));
  }, []);

  function handleSite(e) {
    setSite((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  }

  function handleAccount(e) {
    setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setAccountSaved(false);
  }

  async function saveSite() {
    setSaving(true);
    try {
      await adminAPI.updateSettings({
        site_name: site.name,
        contact_email: site.email,
        site_url: site.url,
        tagline: site.tagline,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  function saveAccount() {
    setAccountSaved(true);
    setTimeout(() => setAccountSaved(false), 2000);
  }

  if (loading) return <div className="admin-loading">Loading settings...</div>;

  return (
    <div className="settings-page">
      {error && <div className="admin-error">{error}</div>}
      <div className="settings-grid">

        {/* Site Details */}
        <div className="settings-card">
          <div className="settings-section-title">Site details</div>
          <div className="settings-form">
            <div className="settings-field">
              <label className="settings-label">Site name</label>
              <input className="settings-input" name="name" value={site.name} onChange={handleSite} />
            </div>
            <div className="settings-field">
              <label className="settings-label">Contact email</label>
              <input className="settings-input" name="email" value={site.email} onChange={handleSite} />
            </div>
            <div className="settings-field">
              <label className="settings-label">Site URL</label>
              <input className="settings-input" name="url" value={site.url} onChange={handleSite} />
            </div>
            <div className="settings-field">
              <label className="settings-label">Tagline</label>
              <input className="settings-input" name="tagline" value={site.tagline} onChange={handleSite} />
            </div>
            <button className="btn-save-settings" onClick={saveSite} disabled={saving}>
              {saved ? "✓ Saved!" : saving ? "Saving..." : "✓ Save settings"}
            </button>
          </div>
        </div>

        {/* Account */}
        <div className="settings-card">
          <div className="settings-section-title">Account</div>
          <div className="settings-form">
            <div className="settings-field">
              <label className="settings-label">Owner name</label>
              <input className="settings-input" name="ownerName" value={account.ownerName} onChange={handleAccount} />
            </div>
            <div className="settings-field">
              <label className="settings-label">Email</label>
              <input className="settings-input" name="email" value={account.email} onChange={handleAccount} />
            </div>
            <div className="settings-field">
              <label className="settings-label">Current password</label>
              <input className="settings-input" type="password" name="currentPassword" value={account.currentPassword} onChange={handleAccount} />
            </div>
            <div className="settings-field">
              <label className="settings-label">New password</label>
              <input className="settings-input" type="password" name="newPassword" value={account.newPassword} onChange={handleAccount} placeholder="Enter new password" />
            </div>
            <div className="account-actions">
              <button className="btn-update" onClick={saveAccount}>
                {accountSaved ? "✓ Updated!" : "✓ Update"}
              </button>
              <button className="btn-logout" onClick={logout}>Log out</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
