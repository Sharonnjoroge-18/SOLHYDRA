import { useState } from 'react';
import { Link } from 'react-router-dom';
import solhydraGif from '../video/solhydra.gif';
import gallery1 from '../images/gallery-1.jpg';
import gallery2 from '../images/gallery-2.jpg';
import gallery3 from '../images/gallery-3.jpg';
import deliveryGirl from '../images/Delivery girl pic.jpg';
import engineerPic from '../images/Engineer pic.jpg';
import officeGuy from '../images/Office guy pic.jpg';
import sportGirl from '../images/Sport girl pic.jpg';
import solhydraBottle from '../images/Our product.jpg';
import './home.css';
import './more.css';

const Home = () => {
    const [activeSize, setActiveSize] = useState('500ml');
    const galleryImages = [
      gallery3,
      gallery2,
      gallery3,
      gallery1,
      gallery3,
      gallery2,
      gallery3,
      gallery1,

      gallery3,
      gallery2,
      gallery3,
      gallery1,
      gallery3,
      gallery2,
      gallery3,
      gallery1,

      gallery3,
      gallery2,
      gallery3,
      gallery1,
      gallery3,
      gallery2,
      gallery3,
      gallery1,
    ];
    const everydayCards = [
      { image: deliveryGirl, role: 'Delivery', name: 'On the move' },
      { image: engineerPic, role: 'Engineer', name: 'On site' },
      { image: officeGuy, role: 'Office', name: 'At work' },
      { image: sportGirl, role: 'Sport', name: 'In training' },
    ];
    const MARQUEE_ITEMS = [
    "IONIZED HYDRATION",
    "MADE FOR AFRICANS",
    "DAILY HYDRATION",
    "CLEAN LABEL",
    "NO ARTIFICIAL ADDITIVES",
    "LOW SUGAR",
    "REAL ELECTROLYTES",
  ];
  return (
    <div className="home-page">
        <section className="hero">
            <div className="hero-left">
                <div className="hero-badge">
                    <span className="badge-dot"></span>
                   IONIZED HYDRATION-NOW AVAILABLE  
                </div>
                
            <h1 className="hero-title">REPLENISH <br />
            WHAT YOU LOSE <br />
            <span className="hero-title--blue">PERFORM WHAT <br />
            MATTERS</span>
            </h1>
            <p className="hero-subtitle">
              Low sugar, real electrolytes.<br />
              Ionised hydration for everyday performance<br />
              designed for Africans
            </p>
            <div className="hero-btns">
              {/* <button className="btn-primary">Shop Now &rarr;</button> */}
              <Link className="btn-primary" to="/shop">
                Shop Now &rarr;
              </Link>
              <Link className="btn-secondary" to="/hydrationcalculator">
                Find Your Hydration Match &rarr;
              </Link>
            </div>
            
            <div className="hero-stats">
                <div className="stat">
                    <span className="stat-number">Low</span>
                    <span className="stat-label">SUGAR</span>
                </div>
                <div className="stat">
                    <span className="stat-number">5+</span>
                    <span className="stat-label">ELECTROLYTES</span>
                </div>
                <div className="stat">
                    <span className="stat-number">0</span>
                    <span className="stat-label">ARTIFICIAL ADDITIVES</span>
                </div>
                <div className="stat"> 
                    <span className="stat-number">3</span>
                    <span className="stat-label">SIZES AVAILABLE</span>
                </div>
              </div>
            </div>
                
            
            <div className="hero-right">
              <div className="product-card">
            <div className="product-tag">You are not tired.<br />You are dehydrated.</div>
            <div className="product-img-wrap">
               <img src={solhydraGif} alt="SolHydra animation" className="home-gif" />
            </div>
            <h3 className="product-size-title">500ml</h3>
            <p className="product-type">HYDRATION DRINK</p>
            <div className="product-sizes">
              {['500ml', '350ml', '200ml'].map(size => (
                <button
                  key={size}
                  className={`size-btn ${activeSize === size ? 'active' : ''}`}
                  onClick={() => setActiveSize(size)}
                >
                  {size}
                </button>
              ))}
              <div className="additive-badge">
                <span>0g</span>
                <small>Artificial Additives</small>
              </div>
            </div>
            
          </div>
        </div>  
        

        </section>
        {/* Gallery Strip */}
            <section className="gallery">
            <div className="gallery-track">
                {galleryImages.map((image, index) => (
                <div key={index} className="gallery-item">
                    <img src={image} alt={`SolHydra lifestyle ${index + 1}`} />
                </div>
                ))}
            </div>
            </section> 

           <div className="marquee-wrapper">
              <div className="marquee-track">
                {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                  <span key={i} className="marquee-item">
                    {item}
                    <span className="marquee-dot">✦</span>
                  </span>
                ))}
              </div>
           </div>


      {/* Everyday People ── */}
      <section className="everyday-section">
        <div className="section-tag">WHO IT'S FOR</div>
        <h2 className="everyday-title">
          EVERYDAY PEOPLE.<br />
          EVERYDAY PERFORMANCE.
        </h2>
        <div className="everyday-grid">
          {everydayCards.map((card) => (
            <div key={card.name} className="everyday-card">
              <img src={card.image} alt={card.name} />
              <div className="everyday-card-label">
                <span className="card-role">{card.role}</span>
                <span className="card-name">{card.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison ── */}
      <section className="compare-section">
        <div className="section-tag">THE SCIENCE</div>
        <h2 className="compare-title">
          REGULAR DRINKS =<br />
          TOO MUCH SUGAR,<br />
          TOO LITTLE BENEFIT.
        </h2>
        <p className="compare-subtitle">
          Most drinks give you the sugar spike without the substance.<br />
          SolHydra gives you real electrolytes, zero artificial colours,<br />
          and a formula that actually works.
        </p>

        <div className="compare-cards">
          {/* Regular */}
          <div className="compare-card compare-card--bad">
            <div className="compare-card-header">
              <span className="compare-icon bad">✕</span>
              <span>Regular Drinks</span>
            </div>
            <table className="compare-table">
              <tbody>
                <tr>
                  <td>Sugar</td>
                  <td className="value bad-value">20–30g</td>
                </tr>
                <tr>
                  <td>Artificial Colours</td>
                  <td className="value bad-value">Yes</td>
                </tr>
                <tr>
                  <td>Real Electrolytes</td>
                  <td className="value bad-value">Hidden</td>
                </tr>
                <tr>
                  <td>Safety Use</td>
                  <td className="value bad-value">Not Safe</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SolHydra */}
          <div className="compare-card compare-card--good">
            <div className="compare-card-header">
              <span className="compare-icon good">✓</span>
              <span>SolHydra</span>
            </div>
            <table className="compare-table">
              <tbody>
                <tr>
                  <td>Sugar</td>
                  <td className="value good-value">0–2g</td>
                </tr>
                <tr>
                  <td>Artificial Colours</td>
                  <td className="value good-value">None</td>
                </tr>
                <tr>
                  <td>Real Electrolytes</td>
                  <td className="value good-value">Transparent</td>
                </tr>
                <tr>
                  <td>Safety Use</td>
                  <td className="value good-value">Perfectly</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why SolHydra ── */}
      <section className="why-section">
        <div className="why-left">
          <div className="section-tag">WHY IT WORKS</div>
          <h2 className="why-title">
            IONIZED.<br />
            LOW SUGAR.<br />
            FOR AFRICANS.
          </h2>

          <div className="why-list">
            {[
              { icon: '⚡', title: 'Ionized Hydration', desc: 'Charged water molecules absorb faster into cells for rapid rehydration.' },
              { icon: '📊', title: 'Low Sugar, Same Results', desc: 'Engineered to hydrate without the sugar crash or empty calories.' },
              { icon: '🌍', title: 'Made by Africans', desc: 'Formulated for African climates, lifestyles and daily performance needs.' },
              { icon: '🧪', title: 'No Harmful Chemicals or Additives', desc: 'Zero artificial dyes, preservatives or fillers. Clean label, clean body.' },
              { icon: '💧', title: 'Designed for Everyday Use', desc: 'Safe for daily hydration — at work, at the gym, or on the go.' },
            ].map((item, i) => (
              <div key={i} className="why-item">
                <div className="why-icon">{item.icon}</div>
                <div>
                  <p className="why-item-title">{item.title}</p>
                  <p className="why-item-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="why-right">
          <div className="why-product-blob">
            <p className="blob-circle">IONIZED HYDRATION <br />REPLENISH. PERFORM.THRIVE</p>
          </div>
        </div>
      </section>

      {/* ── Section 4: CTA Footer ── */}
      <section className="cta-section">
        <img src={solhydraBottle} alt="SolHydra bottles" className="cta-bottles" />
        <h2 className="cta-title">
          LOW SUGAR.<br />
          <span className="cta-blue">REAL ELECTROLYTES.</span><br />
          EVERYDAY PERFORMANCE.
        </h2>
        <div className="cta-badges">
          <span className="cta-badge"> 💧 Ionized</span>
          <span className="cta-badge"> ⚡ Replenish</span>
          <span className="cta-badge"> 🍬 Low Sugar</span>
        </div>
        <p className="cta-size">350ml</p>
      </section>

    </div>
  );
};
 
export default Home;
