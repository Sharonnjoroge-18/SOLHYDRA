import { useState } from "react";
import "./hydrationcalculator.css";

// ── Data ────────────────────────────────────────────────────────────────────
const LOCATIONS = [
  { value: "",         label: "Select your location in Africa" },
  { value: "arid",     label: "🌵 East Africa – Arid/Semi-arid (Turkana, Marsabit)" },
  { value: "hot",      label: "🌴 West Africa – Hot & Humid (Lagos, Accra)" },
  { value: "highland", label: "⛰️  East Africa – Highland/Cool (Nairobi, Kampala)" },
  { value: "tropical", label: "🌿 Central Africa – Rainforest (Kinshasa, Yaoundé)" },
  { value: "savanna",  label: "🦁 Southern Africa – Savanna (Joburg, Lusaka)" },
  { value: "coastal",  label: "🌊 Coastal Africa (Mombasa, Dar es Salaam)" },
  { value: "sahel",    label: "☀️  Sahel – Dry & Hot (Dakar, Niamey)" },
  { value: "maghreb",  label: "🏔️  North Africa – Mediterranean (Cairo, Casablanca)" },
];

const ACTIVITIES = [
  { value: "",         label: "Select your activity level" },
  { value: "low",      label: "🪑 Low – Mostly sitting / desk work" },
  { value: "moderate", label: "🚶 Moderate – Light walks, standing work" },
  { value: "high",     label: "🏃 High – Regular exercise / outdoor labor" },
];

const WEIGHT_OPTIONS = Array.from({ length: 57 }, (_, i) => {
  const kg = 30 + i * 5;
  return { value: kg, label: `${kg} kg` };
});
WEIGHT_OPTIONS.unshift({ value: "", label: "Select your weight" });

const CLIMATE_MULT  = { arid:1.35, hot:1.30, highland:1.00, tropical:1.25, savanna:1.20, coastal:1.20, sahel:1.30, maghreb:1.15 };
const ACTIVITY_MULT = { low:1.00, moderate:1.20, high:1.40 };

// ── Component ────────────────────────────────────────────────────────────────
export default function HydrationCalculator() {
  const [location, setLocation] = useState("");
  const [activity, setActivity] = useState("");
  const [weight,   setWeight]   = useState("");
  const [result,   setResult]   = useState(null);
  const [errors,   setErrors]   = useState({});
  const [shake,    setShake]    = useState(false);

  const validate = () => {
    const e = {};
    if (!location) e.location = "Please select your location.";
    if (!activity) e.activity = "Please select your activity level.";
    if (!weight)   e.weight   = "Please select your weight.";
    return e;
  };

  const calculate = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setErrors({});
    const liters  = Math.round(weight * 35 / 1000 * (CLIMATE_MULT[location] || 1) * (ACTIVITY_MULT[activity] || 1) * 10) / 10;
    const bottles = Math.round(liters / 0.5 * 10) / 10;
    setResult({ liters, bottles });
  };

  const reset = () => { setLocation(""); setActivity(""); setWeight(""); setResult(null); setErrors({}); };

  return (
    <div className="hc-page">
      {/* Animated background orbs */}
      <div className="hc-orb hc-orb-1" />
      <div className="hc-orb hc-orb-2" />
      <div className="hc-orb hc-orb-3" />

      <div className={`hc-card ${shake ? "hc-shake" : ""}`}>
        {/* Header */}
        <div className="hc-header">
          <div className="hc-icon-ring">💧</div>
          <h1>Find Your Hydration Match</h1>
          <p>Personalized daily water intake for your body &amp; lifestyle</p>
        </div>

        {/* Fields */}
        <div className="hc-fields">
          {/* Location */}
          <div className="hc-field">
            <label>📍 Location in Africa</label>
            <div className="hc-select-wrap">
              <select value={location} onChange={e => setLocation(e.target.value)}>
                {LOCATIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <span className="hc-chevron">▾</span>
            </div>
            {errors.location && <span className="hc-err">⚠ {errors.location}</span>}
          </div>

          {/* Activity */}
          <div className="hc-field">
            <label>⚡ Activity Level</label>
            <div className="hc-select-wrap">
              <select value={activity} onChange={e => setActivity(e.target.value)}>
                {ACTIVITIES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <span className="hc-chevron">▾</span>
            </div>
            {errors.activity && <span className="hc-err">⚠ {errors.activity}</span>}
          </div>

          {/* Weight dropdown */}
          <div className="hc-field">
            <label>⚖️ Weight</label>
            <div className="hc-select-wrap">
              <select value={weight} onChange={e => setWeight(Number(e.target.value))}>
                {WEIGHT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <span className="hc-chevron">▾</span>
            </div>
            {errors.weight && <span className="hc-err">⚠ {errors.weight}</span>}
          </div>
        </div>

        {/* Button */}
        <button className="hc-btn" onClick={calculate}>
          Calculate My Needs 💧
        </button>

        {/* Result */}
        {result && (
          <div className="hc-result">
            <div className="hc-wave-bar">
              <span /><span /><span /><span /><span />
            </div>
            <div className="hc-liters">{result.liters}<span className="hc-unit">L</span></div>
            <div className="hc-result-label">Daily Water Intake Recommended</div>
            <div className="hc-tip">
              <span className="hc-tip-accent">|</span>
              That's approximately <strong>{result.bottles} bottles</strong> of SolHydra
              500ml per day to stay optimally hydrated!
            </div>
            <button className="hc-reset" onClick={reset}>↺ Recalculate</button>
          </div>
        )}
      </div>
    </div>
  );
}
