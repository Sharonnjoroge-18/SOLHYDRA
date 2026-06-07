import { useState } from "react";
import "./admin.css";

export default function HeroSection() {
  const [form, setForm] = useState({
    headline1: "Replenish what you lose.",
    headline2: "Perform what matters.",
    subheadline: "Low sugar, real electrolytes. Ionized hydration for everyday performance — designed for Africans, by Africans.",
    ctaText: "Shop now",
    announcement: "Ionized hydration — Now available",
    bgColor: "#0a1560",
  });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleReset() {
    setForm({
      headline1: "Replenish what you lose.",
      headline2: "Perform what matters.",
      subheadline: "Low sugar, real electrolytes. Ionized hydration for everyday performance — designed for Africans, by Africans.",
      ctaText: "Shop now",
      announcement: "Ionized hydration — Now available",
      bgColor: "#0a1560",
    });
    setSaved(false);
  }

  return (
    <div>
      {/* Live Preview — top */}
      <div className="card mb-16">
        <div className="card-title">Live preview</div>
        <div
          className="hero-preview"
          style={{ background: form.bgColor, transition: "background 0.3s" }}
        >
          {/* Announcement badge */}
          {form.announcement && (
            <div className="hero-badge">{form.announcement}</div>
          )}

          {/* Headline — line 1 white, line 2 blue */}
          <div className="hero-preview-headline">
            <span className="hero-line1">{form.headline1}</span>
            <br />
            <span className="hero-line2">{form.headline2}</span>
          </div>

          {/* Subheadline */}
          <div className="hero-preview-sub">{form.subheadline}</div>
        </div>
      </div>

      {/* Edit form — bottom */}
      <div className="row-2">
        <div className="card">
          <div className="card-title">EDIT HERO CONTENT</div>
          <div className="form-stack">
            <div className="form-group">
              <label className="form-label">Headline line 1 (white)</label>
              <input className="form-input" name="headline1" value={form.headline1} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Headline line 2 (blue)</label>
              <input className="form-input" name="headline2" value={form.headline2} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Subheadline</label>
              <textarea className="form-input" name="subheadline" value={form.subheadline} onChange={handleChange} rows={3} />
            </div>
            <div className="form-group">
              <label className="form-label">Announcement badge</label>
              <input className="form-input" name="announcement" value={form.announcement} onChange={handleChange} />
            </div>
            <div className="save-bar">
              <button className="btn-primary" onClick={handleSave}>
                {saved ? "✓ Saved!" : "Save changes"}
              </button>
              <button className="btn-secondary" onClick={handleReset}>Reset</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Hero image</div>
          <div className="upload-zone">
            <i className="ti ti-upload" style={{ fontSize: 28 }} aria-hidden="true" />
            <span style={{ fontSize: 13 }}>Drop image or click to upload</span>
            <span style={{ fontSize: 11 }}>PNG, JPG — max 2MB</span>
          </div>
          <div style={{ marginTop: 16 }}>
            <div className="form-label" style={{ marginBottom: 6 }}>Background colour</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="color"
                name="bgColor"
                value={form.bgColor}
                onChange={handleChange}
                style={{ width: 36, height: 36, border: "none", background: "none", cursor: "pointer", borderRadius: 4 }}
              />
              <input
                className="form-input"
                name="bgColor"
                value={form.bgColor}
                onChange={handleChange}
                style={{ width: 120 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
