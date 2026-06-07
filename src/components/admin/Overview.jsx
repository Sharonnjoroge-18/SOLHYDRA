import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const metrics = [
  { label: "Product live", value: "3", sub: "↑ All Active", up: true },
  { label: "Revenue", value: "KSh 641K", sub: "↑ 8% this month", up: true },
  { label: "Site visits", value: "124", sub: "↑ 5% vs yesterday", up: true },
  { label: "Last Update", value: "TODAY", sub: "Hero 2h ago", up: true },
  { label: "Out of stock", value: "0", sub: "↑ needs restocking", up: false },
];

const pieData = [
  { label: "SolHydra 200ml", value: 32, color: "#4d8cff" },
  { label: "SolHydra 350ml", value: 28, color: "#3ccc85" },
  { label: "SolHydra 500ml", value: 40, color: "#ffa53c" },
];

const recentOrders = [
  { id: "#4821", customer: "Amina W.", product: "SolHydra 200ml 6-pack", amount: "KSh 120", status: "Delivered" },
  { id: "#4820", customer: "Kevin M.", product: "SolHydra 350ml 6-pack", amount: "KSh 1,500", status: "Delivered" },
  { id: "#4819", customer: "Sharon O.", product: "SolHydra 500ml 24-pack", amount: "KSh 6,370", status: "In transit" },
  { id: "#4818", customer: "Brian K.", product: "SolHydra 350ml 24-pack", amount: "KSh 5,680", status: "In transit" },
  { id: "#4817", customer: "Fatuma A.", product: "SolHydra 200ml 24-pack", amount: "KSh 1,480", status: "Pending" },
];

const statusClass = { Delivered: "pill-green", "In transit": "pill-orange", Pending: "pill-red" };

export default function Overview({ onNavigate }) {
  const barRef = useRef(null);
  const pieRef = useRef(null);
  const barChart = useRef(null);
  const pieChart = useRef(null);

  useEffect(() => {
    // ← null checks so it doesn't crash if canvas isn't mounted yet
    if (!barRef.current || !pieRef.current) return;

    if (barChart.current) barChart.current.destroy();
    if (pieChart.current) pieChart.current.destroy();

    barChart.current = new Chart(barRef.current, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
          label: "Units sold",
          data: [320, 410, 380, 520, 600, 480],
          backgroundColor: "rgba(77,140,255,0.5)",
          borderColor: "#4d8cff",
          borderWidth: 1,
          borderRadius: 4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: "rgba(200,215,255,0.5)", font: { size: 11 } }, grid: { color: "rgba(100,140,255,0.08)" } },
          y: { ticks: { color: "rgba(200,215,255,0.5)", font: { size: 11 } }, grid: { color: "rgba(100,140,255,0.08)" } },
        },
      },
    });

    pieChart.current = new Chart(pieRef.current, {
      type: "doughnut",
      data: {
        labels: pieData.map((d) => d.label),
        datasets: [{
          data: pieData.map((d) => d.value),
          backgroundColor: pieData.map((d) => d.color),
          borderColor: "#0d1340",
          borderWidth: 3,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "62%",
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%` } },
        },
      },
    });

    return () => {
      barChart.current?.destroy();
      pieChart.current?.destroy();
    };
  }, []);

  return (
    <div>
      {/* Metric cards */}
      <div className="metrics-grid">
        {metrics.map((m) => (
          <div key={m.label} className="metric-card">
            <div className="metric-label">{m.label}</div>
            <div className="metric-value">{m.value}</div>
            <div className={`metric-sub ${m.up ? "" : "down"}`}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick action bar */}
      <div className="quick-actions">
        <button className="qa-btn" onClick={() => onNavigate("products")}>
          <i className="ti ti-plus" aria-hidden="true" /> Add product
        </button>
        <button className="qa-btn" onClick={() => onNavigate("hero")}>
          <i className="ti ti-pencil" aria-hidden="true" /> Edit hero
        </button>
        <button className="qa-btn" onClick={() => onNavigate("ticker")}>
          <i className="ti ti-pencil" aria-hidden="true" /> Edit ticker
        </button>
        <button className="qa-btn qa-btn-publish">
          <i className="ti ti-send" aria-hidden="true" /> Publish now
        </button>
      </div>

      {/* Charts row */}
      <div className="row-2 mb-16">
        <div className="card">
          <div className="card-title">Monthly sales (units)</div>
          <div className="chart-wrap">
            <canvas ref={barRef} role="img" aria-label="Bar chart showing monthly sales Jan–Jun" />
          </div>
        </div>
        <div className="card">
          <div className="card-title">Most bought product</div>
          <div className="chart-wrap">
            <canvas ref={pieRef} role="img" aria-label="Doughnut chart of sales by product" />
          </div>
          <div className="legend">
            {pieData.map((d) => (
              <span key={d.label} className="legend-item">
                <span className="legend-dot" style={{ background: d.color }} />
                {d.label} {d.value}%
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="card">
        <div className="card-title">Recent orders</div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.product}</td>
                <td>{o.amount}</td>
                <td><span className={`pill ${statusClass[o.status]}`}>{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
