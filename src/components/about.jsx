import './about.css';
import mission from '../images/misssion.png';

const teamMembers = [
  { name: 'Team 12', role: 'Founder & CEO' },
  { name: 'Eunice', role: 'Co-Founder' },
  { name: 'Blessing', role: 'Head of Marketing' },
  { name: 'Rose', role: 'Lead Design' },
];

const coreValues = [
  { icon: '🔬', title: 'Science-Based', desc: 'Every ingredient serves a purpose. No fillers, no compromise — just formulations backed by research.' },
  { icon: '🔍', title: 'Transparency', desc: 'Clear labels, clear ingredients. We make sure you always know exactly what you are drinking.' },
  { icon: '🌍', title: 'Africa-First', desc: 'Designed with African climates, athletes and everyday performers in mind from day one.' },
  { icon: '♻️', title: 'Sustainability', desc: 'Recyclable packaging, ethical sourcing and a commitment to reducing our environmental footprint.' },
  { icon: '🤝', title: 'Community', desc: 'Building a healthier, more hydrated community and supporting wellness initiatives across Africa.' },
  { icon: '♿', title: 'Accessibility', desc: 'Premium quality at fair prices. Hydration that works should be available to everyone, everywhere.' },
];

const About = () => {
  return (
    <div className="about-page">
      <div className="about-content">
      {/* ── Hero Banner ── */}
      <section className="about-hero">
        <h1 className="about-hero-title">Our Story</h1>
        <p className="about-hero-subtitle">
          Born from the African sun and built for everyday hydration. We're
          redefining what it means to stay hydrated in our climates.
        </p>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="mission-section">
        <div className="mission-left">
            <img src={mission} alt="Our Mission" className="mission-img" />
        </div>

        <div className="mission-right">
          <h2 className="mission-title">Our Mission & Vision</h2>
          <p className="mission-text">
            To provide hydrated, energized and productive affordable,
            lower-sugar ionized drink without the health cost of excess sugar.
          </p>
          <p className="mission-text">
            To become Africa's most trusted mass-market hydration brand,
            proving that lower sugar and higher performance belong in every
            home, every worksite, and every ordinary day.
          </p>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="values-section">
        <div className="values-container">
          <h2 className="values-title">Our Core Values</h2>
          <div className="values-grid">
            {coreValues.map((value, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-name">{value.title}</h3>
                <p className="value-desc">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="team-section">
        <h2 className="team-title">Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, i) => (
            <div key={i} className="team-card">
              <div className="team-avatar">
                <span className="team-avatar-placeholder">👩</span>
              </div>
              <p className="team-name">{member.name}</p>
              <p className="team-role">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      </div>
    </div>
  );
};

export default About;
