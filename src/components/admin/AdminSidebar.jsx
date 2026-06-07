import { useAuth } from "../../AuthContext";
import "./admin.css";

const navGroups = [
  {
    groupLabel: "Management",
    items: [
      { id: "overview", label: "Overview", icon: "ti-layout-dashboard" },
      { id: "products", label: "Products", icon: "ti-circle" },
      { id: "hero", label: "Hero section", icon: "ti-hammer" },
      { id: "ticker", label: "Ticker strip", icon: "ti-menu-2" },
    ],
  },
  {
    groupLabel: "System",
    items: [
      { id: "settings", label: "Settings", icon: "ti-settings" },
    ],
  },
];

export default function AdminSidebar({ active, onNavigate }) {
  const { user } = useAuth();

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-site-manager">
        <span className="sidebar-site-manager-text">Site manager</span>
      </div>

      <nav className="sidebar-nav">
        {navGroups.map((group) => (
          <div key={group.groupLabel} className="sidebar-group">
            <div className="sidebar-group-label">{group.groupLabel}</div>
            {group.items.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${active === item.id ? "active" : ""}`}
                onClick={() => onNavigate(item.id)}
                title={item.label}
              >
                <i className={`ti ${item.icon}`} aria-hidden="true" />
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-user">
        <div className="sidebar-user-avatar">{initials}</div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">{user?.name || "Admin"}</div>
          <div className="sidebar-user-role">Site Owner</div>
        </div>
      </div>
    </aside>
  );
}
