import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import Overview from "./Overview";
import Products from "./Products";
import HeroSection from "./HeroSection";
import TickerStrip from "./TickerStrip";
import Settings from "./Settings";
import "./admin.css";

const sectionTitles = {
  overview: "Overview",
  products: "Products",
  hero: "Hero section",
  ticker: "Ticker carousel strip",
  settings: "Settings",
};

export default function AdminLayout() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = {
    overview: <Overview onNavigate={setActiveSection} />,
    products: <Products />,
    hero: <HeroSection />,
    ticker: <TickerStrip />,
    settings: <Settings />,
  };

  return (
    <div className="admin-dash">
      <AdminSidebar active={activeSection} onNavigate={setActiveSection} />
      <div className="admin-main">
        <AdminTopbar
          title={sectionTitles[activeSection]}
          activeSection={activeSection}
        />
        <div className="admin-content">
          {sections[activeSection]}
        </div>
      </div>
    </div>
  );
}
