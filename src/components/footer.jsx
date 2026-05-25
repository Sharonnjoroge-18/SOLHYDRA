import './footer.css';
import logo from '../images/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo-box">
            <img src={logo} alt="SolHydra Logo" className="logo-image" />
          </div>
          <p>Replenish what you lose.</p>
          <p>Perform what matters.</p>
          <p>Made for Africans, by Africans</p>
        </div>
        <div className="footer-grid">
          <div className="footer-col">
            <h4>PRODUCT</h4>
            <a href="#">500ml-Full Day</a>
            <a href="#">350ml-On-The-Go</a>
            <a href="#">200-Pocket Size</a>
          </div>
          <div className="footer-col">
            <h4>COMPANY</h4>
            <a href="#">About Us</a>
            <a href="#">Our Story</a>
            <a href="#">Blogs</a>
            <a href="#">Careers</a>
          </div>
          <div className="footer-col">
            <h4>SUPPORT</h4>
            <a href="#">FAQs</a>
            <a href="#">Contact Us</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 SolHydra Water. All rights reserved.Mde for Africans, by Africans</p>
      </div>
    </footer>
  );
};

export default Footer;
