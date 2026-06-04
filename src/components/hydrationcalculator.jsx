import { useState } from "react";
import axios from "axios";
import "./hydrationcalculator.css";

// ── Data ────────────────────────────────────────────────────────────────────
const LOCATIONS = [
  { value: "",         label: "Select your location" },
  { value: "Kenya",    label: "🇰🇪 Kenya" },
  { value: "Nigeria",  label: "🇳🇬 Nigeria" },
  { value: "Uganda",   label: "🇺🇬 Uganda" },
  { value: "Ghana",    label: "🇬🇭 Ghana" },
  { value: "South Africa", label: "🇿🇦 South Africa" },
  { value: "Zimbabwe", label: "🇿🇼 Zimbabwe" }, 
];

const ACTIVITIES = [
  { value: "",         label: "Select your activity level" },
  { value: "low",      label: "🪑 Low – Mostly sitting / desk work" },
  { value: "medium",   label: "🚶 Medium – Light walks, standing work" },
  { value: "high",     label: "🏃 High – Regular exercise / outdoor labor" },
];

const WEIGHT_OPTIONS = Array.from({ length: 57 }, (_, i) => {
  const kg = 30 + i * 5;
  return { value: kg, label: `${kg} kg` };
});
WEIGHT_OPTIONS.unshift({ value: "", label: "Select your weight" });

// Local calculations fallback map
const CLIMATE_MULT  = { Kenya: 1.00, Nigeria: 1.30, Uganda: 1.00, Ghana: 1.30, "South Africa": 1.20, Zimbabwe: 1.15 };
const ACTIVITY_MULT = { low: 1.00, medium: 1.20, high: 1.40 };

// ── Component ────────────────────────────────────────────────────────────────
export default function HydrationCalculator() {
  const [location, setLocation] = useState("");
  const [activity, setActivity] = useState("");
  const [weight,   setWeight]   = useState("");
  const [result,   setResult]   = useState(null);
  const [errors,   setErrors]   = useState({});
  const [shake,    setShake]    = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!location) e.location = "Please select your country.";
    if (!activity) e.activity = "Please select your activity level.";
    if (!weight)   e.weight   = "Please select your weight.";
    return e;
  };

  const calculate = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setErrors({});
    
    // 1. Run local frontend calculation for instant display backup
    const localLiters  = Math.round(weight * 35 / 1000 * (CLIMATE_MULT[location] || 1) * (ACTIVITY_MULT[activity] || 1) * 10) / 10;
    const localBottles = Math.round(localLiters / 0.5 * 10) / 10;
    setResult({ liters: localLiters, bottles: localBottles });

    // 2. ── Connect to Backend Pipeline ──
    setIsLoading(true);
    try {
      const payload = {
        country: location,                 
        activity_level: activity,          
        weight_kg: Number(weight)          
      };

      const response = await axios.post("https://hydra-backend-production-4f57.up.railway.app/calculator/calculate", payload);
      
      if (response.status === 200 || response.status === 201) {
        console.log("Hydration successfully recorded on backend server:", response.data);
        
        if (response.data && response.data.daily_water_ml) {
          const serverLiters = response.data.daily_water_ml / 1000; // e.g. 2541ml -> 2.541L
          const formattedLiters = Math.round(serverLiters * 10) / 10; // Round to 1 decimal place -> 2.5L
          const serverBottles = Math.round(formattedLiters / 0.5 * 10) / 10;
          
          setResult({
            liters: formattedLiters,
            bottles: serverBottles
          });
        }
      }
    } catch (error) {
      console.error("Backend transmission sync failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => { 
    setLocation(""); 
    setActivity(""); 
    setWeight(""); 
    setResult(null); 
    setErrors({}); 
  };

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
            <label>📍 Country Location</label>
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
        <button className="hc-btn" onClick={calculate} disabled={isLoading}>
          {isLoading ? "Syncing data... ⏳" : "Calculate My Needs 💧"}
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