import { useState } from "react";

const initialItems = [
  { id: 1, icon: "ti-bolt", text: "Ionised hydration", tag: "Promo" },
  { id: 2, icon: "ti-droplet", text: "Made for Africans", tag: "Product launch" },
  { id: 3, icon: "ti-trophy", text: "Daily hydration", tag: "Brand badge" },
  { id: 4, icon: "ti-bolt", text: "Clean Label", tag: "Promo" },
  { id: 5, icon: "ti-droplet", text: "No artificial additives", tag: "Product launch" },
  { id: 6, icon: "ti-trophy", text: "Low sugar", tag: "Brand badge" },
  { id: 7, icon: "ti-droplet", text: "Real electrolytes", tag: "Product launch" },
  { id: 8, icon: "ti-trophy", text: "Seasonal promo => coming soon", tag: "Brand badge" },
];

export default function TickerStrip() {
  const [items, setItems] = useState(initialItems);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [newText, setNewText] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  function deleteItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function startEdit(item) {
    setEditId(item.id);
    setEditText(item.text);
  }

  function saveEdit() {
    setItems((prev) => prev.map((i) => (i.id === editId ? { ...i, text: editText } : i)));
    setEditId(null);
  }

  function addItem() {
    if (!newText.trim()) return;
    setItems((prev) => [...prev, { id: Date.now(), icon: "ti-star", text: newText.trim(), tag: "Custom" }]);
    setNewText("");
    setShowAdd(false);
  }

  const tickerString = items.map((i) => i.text).join("  •  ");

  return (
    <div>
      <div className="section-header">
        <span className="section-heading">Ticker Strip</span>
        <button className="btn-primary" onClick={() => setShowAdd(true)}>
          <i className="ti ti-plus" aria-hidden="true" /> Add item
        </button>
      </div>

      {/* Live preview */}
      <div className="card mb-16">
        <div className="card-title">Live preview</div>
        <div className="ticker-preview-wrap">
          <div className="ticker-moving" style={{ animationDuration: `${Math.max(10, items.length * 5)}s` }}>
            {tickerString} &nbsp;•&nbsp; {tickerString}
          </div>
        </div>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="card mb-16">
          <div className="card-title">New mess</div>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              className="form-input"
              style={{ flex: 1 }}
              placeholder="Enter ticker text..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <button className="btn-primary" onClick={addItem}>Add</button>
            <button className="btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Items list */}
      <div className="card">
        <div className="card-title">All Messages</div>
        <div className="ticker-list">
          {items.map((item) => (
            <div key={item.id} className="ticker-item">
              <div className="ticker-icon">
                <i className={`ti ${item.icon}`} aria-hidden="true" />
              </div>
              <div className="ticker-text-wrap">
                {editId === item.id ? (
                  <input
                    className="form-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{ fontSize: 13 }}
                  />
                ) : (
                  <>
                    <div>{item.text}</div>
                    <div className="ticker-sub">{item.tag}</div>
                  </>
                )}
              </div>
              {editId === item.id ? (
                <button className="btn-primary" style={{ padding: "4px 10px", fontSize: 12 }} onClick={saveEdit}>Save</button>
              ) : (
                <>
                  <i className="ti ti-edit" style={{ color: "#4d8cff", cursor: "pointer", fontSize: 16 }} onClick={() => startEdit(item)} aria-label="Edit" />
                  <i className="ti ti-trash" style={{ color: "#ff5a5a", cursor: "pointer", fontSize: 16 }} onClick={() => deleteItem(item.id)} aria-label="Delete" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
