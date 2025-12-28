import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ReferenceLine,
  Cell,
} from "recharts";

export default function ComparisonCharts({ funds }) {
  const [advancedMode, setAdvancedMode] = useState(false);

  const neonColors = ["#10B981", "#3B82F6", "#FACC15"];
  const colorMap = useMemo(
    () =>
      Object.fromEntries(
        (funds || []).map((f, i) => [f.name, neonColors[i % neonColors.length]])
      ),
    [funds]
  );

  // RETURNS DATA
  const returnsData = useMemo(() => {
    if (!funds?.length) return [];
    return [
      { name: "1Y", ...Object.fromEntries(funds.map((f) => [f.name, f.return1y])) },
      { name: "3Y", ...Object.fromEntries(funds.map((f) => [f.name, f.return3y])) },
      { name: "5Y", ...Object.fromEntries(funds.map((f) => [f.name, f.return5y])) },
    ];
  }, [funds]);

  // NORMALIZED PERFORMANCE (Advanced Mode)
  const normalizedData = useMemo(() => {
    if (!funds?.length) return [];
    const base = 100;

    return [
      { name: "1Y", ...Object.fromEntries(funds.map((f) => [f.name, base + (f.return1y || 0)])) },
      { name: "3Y", ...Object.fromEntries(funds.map((f) => [f.name, base + (f.return3y || 0)])) },
      { name: "5Y", ...Object.fromEntries(funds.map((f) => [f.name, base + (f.return5y || 0)])) },
    ];
  }, [funds]);

  // VOLATILITY
  const calcVol = (arr) => {
    const v = arr.filter((x) => typeof x === "number");
    if (v.length <= 1) return 0;
    const avg = v.reduce((a, b) => a + b, 0) / v.length;
    const variance = v.reduce((a, b) => a + (b - avg) ** 2, 0) / v.length;
    return Number(Math.sqrt(variance).toFixed(2));
  };

  const volatility = useMemo(
    () =>
      funds?.map((f) => ({
        name: f.name,
        vol: calcVol([f.return1y, f.return3y, f.return5y]),
      })) || [],
    [funds]
  );

  const riskLevel = {
    Low: 20,
    Moderate: 50,
    Medium: 60,
    High: 90,
    VeryHigh: 100,
  };

  // AI SCORE
  const scores = useMemo(() => {
    const calc = (f) => {
      let s = 0;
      s += (f.return1y || 0) * 0.2;
      s += (f.return3y || 0) * 0.3;
      s += (f.return5y || 0) * 0.4;
      s -= (f.expenseRatio || 0) * 0.4;
      s -= (riskLevel[f.risk] || 40) * 0.3;
      s += Math.log(f.aum || 1) * 2;
      return Math.max(0, Math.round(s));
    };

    return funds?.map((f) => ({ name: f.name, score: calc(f) })) || [];
  }, [funds]);

  // Insight message
  const insight = useMemo(() => {
    if (!scores || scores.length < 2) return "Add at least two funds.";
    const best = scores.reduce((a, b) => (a.score > b.score ? a : b));
    const worst = scores.reduce((a, b) => (a.score < b.score ? a : b));
    return `AI Analysis: Best performer → ${best.name} (${best.score}). Weakest performer → ${worst.name} (${worst.score}).`;
  }, [scores]);

  // QUADRANT ANALYSIS
  const quadrantData = useMemo(() => {
    return (
      funds?.map((f) => ({
        name: f.name,
        risk: riskLevel[f.risk] || 50,
        returnScore:
          (f.return1y || 0) * 0.2 +
          (f.return3y || 0) * 0.3 +
          (f.return5y || 0) * 0.5,
        size: (f.aum || 1000) / 400,
      })) || []
    );
  }, [funds]);

  if (!funds?.length)
    return <p className="text-gray-400 text-center">Select funds to compare.</p>;

  // Tooltip style
  const tooltipStyle = {
    backgroundColor: "#0d131a",
    border: "1px solid #10b981",
    borderRadius: "12px",
    color: "white",
  };

  return (
    <div className="space-y-10">

      {/* Toggle */}
      <div className="flex justify-end">
        <button
          onClick={() => setAdvancedMode(!advancedMode)}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_0_12px_#10b98160]"
        >
          {advancedMode ? "Standard Mode" : "Enable Advanced Mode"}
        </button>
      </div>

      {/* AI INSIGHT */}
      {advancedMode && (
        <div className="p-4 bg-[#0d131a]/70 border border-emerald-600/30 rounded-xl">
          <h3 className="text-lg font-semibold text-emerald-400 mb-2">
            AI Insights
          </h3>
          <p className="text-gray-300">{insight}</p>
        </div>
      )}

      {/* 📈 PERFORMANCE LINE CHART */}
      <div className="bg-[#0b0f14]/80 rounded-2xl p-6 border border-emerald-500/20">
        <h3 className="text-xl font-semibold text-emerald-400 mb-4">
          {advancedMode ? "Normalized Performance" : "Returns Comparison"}
        </h3>

        <div style={{ width: "100%", height: 360 }}>
          <ResponsiveContainer>
            <LineChart data={advancedMode ? normalizedData : returnsData}>
              <CartesianGrid stroke="#1a242f" strokeDasharray="4 4" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              {funds.map((f) => (
                <Line
                  key={f.id}
                  dataKey={f.name}
                  type="monotone"
                  stroke={colorMap[f.name]}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🧠 AI SCORE BAR CHART */}
      {advancedMode && (
        <div className="bg-[#0b0f14]/80 rounded-2xl p-6 border border-blue-500/20">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">
            Overall AI Score
          </h3>

          <div style={{ width: "100%", height: 330 }}>
            <ResponsiveContainer>
              <BarChart data={scores}>
                <CartesianGrid stroke="#1a242f" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="score" fill="#3B82F6" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* 🎯 QUADRANT ANALYSIS */}
      <div className="bg-[#0b0f14]/80 rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">
          Risk–Return Quadrant
        </h3>

        <div style={{ width: "100%", height: 380 }}>
          <ResponsiveContainer>
            <ScatterChart>
              <CartesianGrid stroke="#1a242f" />
              <XAxis type="number" dataKey="risk" domain={[0, 120]} tick={{ fill: "#aaa" }} />
              <YAxis type="number" dataKey="returnScore" domain={[0, 100]} tick={{ fill: "#aaa" }} />

              <ReferenceLine x={60} stroke="#555" strokeDasharray="4 4" />
              <ReferenceLine y={50} stroke="#555" strokeDasharray="4 4" />

              <Tooltip contentStyle={tooltipStyle} />
              <Legend />

              <Scatter name="Funds" data={quadrantData}>
                {quadrantData.map((entry, idx) => (
                  <Cell
                    key={idx}
                    fill={colorMap[entry.name]}
                    r={Math.sqrt(entry.size) * 4}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 text-center text-gray-400 text-xs mt-4">
          <p>Low Risk • High Return (Best)</p>
          <p>High Risk • High Return</p>
          <p>Low Risk • Low Return</p>
          <p>High Risk • Low Return (Worst)</p>
        </div>
      </div>
    </div>
  );
}
