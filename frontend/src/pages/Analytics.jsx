import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ZAxis,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from "recharts";

const API_URL = "http://localhost:4000/api/funds";

const COLORS = ["#10b981", "#38bdf8", "#f97316", "#e11d48", "#6366f1", "#14b8a6"];

/* ----------------------------------------------------------- */
export default function Analytics() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------------- LOAD API ---------------- */
  useEffect(() => {
    async function loadFunds() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setFunds(data);
      } catch (err) {
        setError("Failed to load data – backend might be offline");
      } finally {
        setLoading(false);
      }
    }
    loadFunds();
  }, []);

  const totalFunds = funds.length;

  /* KPI Calculations */
  const avgReturn =
    totalFunds > 0
      ? (
          funds.reduce((s, f) => s + (f.threeYear || 0), 0) / totalFunds
        ).toFixed(2)
      : 0;

  const avgRisk =
    totalFunds > 0
      ? (
          funds.reduce((s, f) => s + (f.riskScore || 2), 0) / totalFunds
        ).toFixed(1)
      : 0;

  const avgAUM =
    totalFunds > 0
      ? (
          funds.reduce((s, f) => s + (f.aum || 2000), 0) / 1000
        ).toFixed(2)
      : 0;

  /* NAV Simulation */
  const navHistory = [...Array(12)].map((_, i) => ({
    month: `M${i + 1}`,
    nav: 100 + Math.random() * 40,
  }));

  /* Heatmap Data */
  const heatData = funds.map((f) => ({
    x: f.riskScore || 2,
    y: f.threeYear || 5,
    z: (f.aum || 1000) / 1000,
    name: f.name,
  }));

  /* Sector Donut */
  const sectorData =
    totalFunds > 0
      ? Object.values(
          funds.reduce((acc, f) => {
            const key = f.sector || "Others";
            acc[key] = acc[key] || { name: key, value: 0 };
            acc[key].value++;
            return acc;
          }, {})
        )
      : [];

  /* Risk */
  const riskDistribution =
    totalFunds > 0
      ? Object.values(
          funds.reduce((acc, f) => {
            const key = f.risk || "Unknown";
            acc[key] = acc[key] || { name: key, value: 0 };
            acc[key].value++;
            return acc;
          }, {})
        )
      : [];

  /* Type */
  const typeDistribution =
    totalFunds > 0
      ? Object.values(
          funds.reduce((acc, f) => {
            const key = f.type || "Unknown";
            acc[key] = acc[key] || { name: key, value: 0 };
            acc[key].value++;
            return acc;
          }, {})
        )
      : [];

  if (loading) return <p className="text-gray-400 text-center mt-10">Loading analytics...</p>;
  if (error) return <p className="text-red-400 text-center mt-10">{error}</p>;

  return (
    <div className="analytics-page space-y-14 p-2">

      {/* HEADER */}
      <div className="fade-in">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Premium Analytics Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Advanced financial analytics powered by AI-enhanced insights.
        </p>
      </div>

      {/* CHARTS FIXED WRAPPER */}
      <div className="w-full space-y-10">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Heatmap */}
          <ChartTile title="Risk vs Return Heatmap">
            <ResponsiveContainer>
              <ScatterChart>
                <XAxis dataKey="x" stroke="#aaa" />
                <YAxis dataKey="y" stroke="#aaa" />
                <ZAxis dataKey="z" range={[40, 200]} />
                <Tooltip />
                <Scatter data={heatData} fill="#38bdf8" />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartTile>

          {/* Sector */}
          <ChartTile title="Sector Allocation">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={sectorData} dataKey="value" outerRadius={80} label>
                  {sectorData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartTile>

          {/* Risk */}
          <ChartTile title="Risk Distribution">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={riskDistribution} dataKey="value" outerRadius={80} label>
                  {riskDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartTile>

        </div>

        {/* FUND TYPE */}
        <ChartTile title="Fund Type Distribution">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={typeDistribution} dataKey="value" outerRadius={80} label>
                {typeDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartTile>

      </div>
    </div>
  );
}

/* ------------------ Chart Tile ------------------ */
function ChartTile({ title, children }) {
  return (
    <div className="glass-tile p-6 rounded-2xl fade-in">
      <h3 className="text-white font-semibold mb-3">{title}</h3>

      {/* FIX: GUARANTEED HEIGHT AND WIDTH */}
      <div style={{ width: "100%", height: 260, minHeight: 260 }}>
        {children}
      </div>
    </div>
  );
}
