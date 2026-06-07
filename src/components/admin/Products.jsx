import { useState } from "react";
import "./Products.css";

const initialProducts = [
  {
    id: 1,
    name: "SolHydra 200ml",
    subtitle: "Regular - Daily hydration",
    size: "200ml",
    pack: "6-Pack",
    price: 1200,
    status: "Live",
    description: "Full-day hydration with real electrolytes. Zero artificial additives. Designed for everyday performance.",
  },
  {
    id: 2,
    name: "SolHydra 200ml",
    subtitle: "Regular - Daily hydration",
    size: "200ml",
    pack: "24-Pack",
    price: 4580,
    status: "Live",
    description: "Full-day hydration with real electrolytes. Zero artificial additives. Designed for everyday performance.",
  },
  {
    id: 3,
    name: "SolHydra 350ml",
    subtitle: "Full-day - Performance",
    size: "350ml",
    pack: "6-Pack",
    price: 1500,
    status: "Live",
    description: "Extended hydration for long days and intense activity.",
  },
  {
    id: 4,
    name: "SolHydra 350ml",
    subtitle: "Full-day - Performance",
    size: "350ml",
    pack: "24-Pack",
    price: 5680,
    status: "Live",
    description: "Extended hydration for long days and intense activity.",
  },
  {
    id: 5,
    name: "SolHydra 500ml",
    subtitle: "Power pack - On the go",
    size: "500ml",
    pack: "6-Pack",
    price: 1800,
    status: "Live",
    description: "Maximum hydration for athletes and high-performance lifestyles.",
  },
  {
    id: 6,
    name: "SolHydra 500ml",
    subtitle: "Power pack - On the go",
    size: "500ml",
    pack: "24-Pack",
    price: 6370,
    status: "Out of Stock",
    description: "Maximum hydration for athletes and high-performance lifestyles.",
  },
];

const defaultPackOptions = ["6-Pack", "24-Pack"];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [editProduct, setEditProduct] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [saved, setSaved] = useState(false);
  const [packFilter, setPackFilter] = useState("all");

  const emptyForm = {
    name: "",
    subtitle: "",
    size: "200ml",
    pack: "6-Pack",
    price: "",
    status: "Live",
    description: "",
  };
  const [form, setForm] = useState(emptyForm);

  function getProductPack(product) {
    return product.pack?.trim() || "6-Pack";
  }

  function openEdit(product) {
    setEditProduct(product.id);
    setForm({
      name: product.name,
      subtitle: product.subtitle,
      size: product.size,
      pack: getProductPack(product),
      price: product.price,
      status: product.status,
      description: product.description,
    });
    setShowAdd(false);
  }

  function openAdd() {
    setForm(emptyForm);
    setShowAdd(true);
    setEditProduct(null);
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSave() {
    if (editProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editProduct ? { ...p, ...form, price: Number(form.price) } : p
        )
      );
    } else {
      setProducts((prev) => [
        ...prev,
        { id: Date.now(), ...form, price: Number(form.price) },
      ]);
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setEditProduct(null);
      setShowAdd(false);
    }, 1200);
  }

  function handleDelete(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (editProduct === id) setEditProduct(null);
  }

  function handleCancel() {
    setEditProduct(null);
    setShowAdd(false);
  }

  const showForm = editProduct !== null || showAdd;
  const packOptions = [
    ...new Set([...defaultPackOptions, ...products.map(getProductPack)]),
  ];
  const visibleProducts =
    packFilter === "all"
      ? products
      : products.filter((product) => getProductPack(product) === packFilter);

  return (
    <div className="prod-page">
      <div className="prod-card">
        <div className="prod-table-header">
          <span className="prod-table-label">All products</span>
          <div className="prod-header-actions">
            <select
              className="pack-filter"
              value={packFilter}
              onChange={(e) => setPackFilter(e.target.value)}
            >
              <option value="all">All packs</option>
              {packOptions.map((pack) => (
                <option key={pack} value={pack}>
                  {pack}
                </option>
              ))}
            </select>
            <button className="btn-add" onClick={openAdd}>+ Add product</button>
          </div>
        </div>

        <table className="prod-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Size</th>
              <th>Pack</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleProducts.map((p) => (
              <tr key={p.id} className={editProduct === p.id ? "row-active" : ""}>
                <td>
                  <div className="prod-name-cell">
                    <div className="prod-icon">
                      <i className="ti ti-droplet-filled" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="prod-name">{p.name}</div>
                      <div className="prod-subtitle">{p.subtitle}</div>
                    </div>
                  </div>
                </td>
                <td className="prod-size">{p.size}</td>
                <td className="prod-pack">{getProductPack(p)}</td>
                <td className="prod-price">KES {p.price.toLocaleString()}</td>
                <td>
                  <span className={`status-pill ${p.status === "Live" ? "pill-live" : "pill-oos"}`}>
                    {p.status}
                  </span>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="action-btn" onClick={() => openEdit(p)} aria-label="Edit">
                      <i className="ti ti-edit" aria-hidden="true" />
                    </button>
                    <button className="action-btn action-btn-del" onClick={() => handleDelete(p.id)} aria-label="Delete">
                      <i className="ti ti-x" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="prod-card prod-edit-card">
          <div className="prod-table-label" style={{ marginBottom: 16 }}>
            {showAdd ? "Add product" : "Edit product"}
          </div>

          <div className="edit-row">
            <div className="edit-field">
              <label className="edit-label">Product name</label>
              <input
                className="edit-input"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="SolHydra 500ml"
              />
            </div>
            <div className="edit-field">
              <label className="edit-label">Size</label>
              <input
                className="edit-input"
                name="size"
                value={form.size}
                onChange={handleChange}
                placeholder="500ml"
              />
            </div>
          </div>

          <div className="edit-row">
            <div className="edit-field">
              <label className="edit-label">Pack</label>
              <input
                className="edit-input"
                name="pack"
                value={form.pack}
                onChange={handleChange}
                placeholder="6-Pack"
              />
            </div>
            <div className="edit-field">
              <label className="edit-label">Price (KES)</label>
              <input
                className="edit-input"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="1200"
              />
            </div>
          </div>

          <div className="edit-row">
            <div className="edit-field">
              <label className="edit-label">Status</label>
              <select className="edit-input edit-select" name="status" value={form.status} onChange={handleChange}>
                <option value="Live">Live</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="edit-field" style={{ marginTop: 12 }}>
            <label className="edit-label">Description</label>
            <textarea
              className="edit-input edit-textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Product description..."
              rows={3}
            />
          </div>

          <div className="edit-actions">
            <button className="btn-save" onClick={handleSave}>
              {saved ? "Saved!" : <><i className="ti ti-device-floppy" aria-hidden="true" /> Save changes</>}
            </button>
            <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
