import logo from "../../images/logo.png";
import "./admin.css";

export default function AdminTopbar({ title, activeSection }) {
  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <div className="topbar-logo">
          <img src={logo} alt="SolHydra" className="topbar-logo-img" />
        </div>
        <span className="topbar-divider" />
        <span className="topbar-title">{title}</span>
      </div>

      <div className="topbar-right">
        <button className="btn-preview" onClick={() => window.open("/", "_blank")}>
          <i className="ti ti-eye" aria-hidden="true" /> Preview site
        </button>
        <button className="btn-publish">
          <i className="ti ti-send" aria-hidden="true" /> Publish changes
        </button>
      </div>
      
    </header>
  );
}
