import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

// Lazy-loaded charts
const LineChart = lazy(() =>
  import("react-chartjs-2").then((mod) => ({ default: mod.Line }))
);
const DoughnutChart = lazy(() =>
  import("react-chartjs-2").then((mod) => ({ default: mod.Doughnut }))
);

// Dynamic chart.js imports
let ChartJS = null;
let LineElement = null;
let CategoryScale = null;
let PointElement = null;
let LinearScale = null;
let Tooltip = null;
let Legend = null;
let ArcElement = null;

export default function FundDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fund, setFund] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  // Load chart.js dynamically
  useEffect(() => {
    async function loadChartCore() {
      const chart = await import("chart.js");

      ChartJS = chart.Chart;
      LineElement = chart.LineElement;
      CategoryScale = chart.CategoryScale;
      PointElement = chart.PointElement;
      LinearScale = chart.LinearScale;
      Tooltip = chart.Tooltip;
      Legend = chart.Legend;
      ArcElement = chart.ArcElement;

      ChartJS.register(
        LineElement,
        CategoryScale,
        PointElement,
        LinearScale,
        Tooltip,
        Legend,
        ArcElement
      );
    }

    loadChartCore();
  }, []);

  // Load fund details
  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/api/funds/${id}`);
        setFund(res.data);
      } catch (err) {
        console.error("Fund load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <p className="text-white p-10">Loading...</p>;
  if (!fund) return <p className="text-white p-10">Fund not found.</p>;

  const navData = {
    labels: ["5Y", "4Y", "3Y", "2Y", "1Y", "Today"],
    datasets: [
      {
        label: "NAV Trend",
        data: [30, 45, 60, 78, 95, 120],
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.2)",
        tension: 0.4,
      },
    ],
  };

  const sectorData = {
    labels: ["Finance", "Tech", "Energy", "Pharma", "Others"],
    datasets: [
      {
        data: [30, 25, 15, 10, 20],
        backgroundColor: [
          "#34d399",
          "#60a5fa",
          "#fbbf24",
          "#f472b6",
          "#9ca3af",
        ],
        borderWidth: 0,
      },
    ],
  };

  const holdings = [
    { company: "HDFC Bank", allocation: 8.2 },
    { company: "Reliance Industries", allocation: 7.4 },
    { company: "Infosys", allocation: 6.1 },
    { company: "ICICI Bank", allocation: 5.8 },
    { company: "TCS", allocation: 4.9 },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-10 space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold">{fund.name}</h1>
        <p className="text-gray-400 text-lg mt-2">
          {fund.amc} • {fund.category} • {fund.risk} Risk
        </p>

        <div className="flex gap-4 mt-6">
          <button className="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-700">
            Invest
          </button>

          <button
            onClick={() => navigate(`/compare?id=${fund.id}`)}
            className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700"
          >
            Compare
          </button>

          <button className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">
            Watchlist ★
          </button>
        </div>
      </div>

      {/* RETURNS CARDS */}
      <div className="grid grid-cols-3 gap-6">
        <ReturnCard label="1 Year" value={fund.oneYear} color="text-green-400" />
        <ReturnCard label="3 Year" value={fund.threeYear} color="text-blue-400" />
        <ReturnCard label="5 Year" value={fund.fiveYear} color="text-yellow-400" />
      </div>

      {/* NAV CHART */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
        <h2 className="text-2xl font-semibold mb-4">NAV Performance</h2>

        <Suspense fallback={<p className="text-gray-400">Loading chart…</p>}>
          <LineChart data={navData} />
        </Suspense>
      </div>

      {/* TABS */}
      <div className="flex gap-6 text-lg border-b border-gray-700 pb-3">
        {["overview", "performance", "holdings", "sectors"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize ${
              activeTab === tab
                ? "text-emerald-400 border-b-2 border-emerald-400"
                : "text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === "overview" && <OverviewSection fund={fund} />}

      {activeTab === "performance" && <PerformanceSection fund={fund} />}

      {activeTab === "holdings" && <HoldingsSection holdings={holdings} />}

      {activeTab === "sectors" && (
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-2xl font-semibold mb-6">Sector Allocation</h2>

          <div className="w-72 mx-auto">
            <Suspense fallback={<p className="text-gray-400">Loading…</p>}>
              <DoughnutChart data={sectorData} />
            </Suspense>
          </div>
        </div>
      )}

      {/* BACK */}
      <button
        onClick={() => window.history.back()}
        className="px-5 py-2 bg-gray-800 rounded hover:bg-gray-700"
      >
        ← Back
      </button>
    </div>
  );
}

/* SUB COMPONENTS */

function ReturnCard({ label, value, color }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h4 className="text-gray-300">{label}</h4>
      <p className={`text-2xl font-bold ${color}`}>{value}%</p>
    </div>
  );
}

function OverviewSection({ fund }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4">
      <h2 className="text-2xl font-semibold">Fund Overview</h2>

      <p className="text-gray-400 leading-relaxed">
        This fund belongs to the <strong>{fund.category}</strong> category and is
        managed by <strong>{fund.amc}</strong>. It suits investors with a{" "}
        <strong>{fund.risk}</strong> risk appetite.
      </p>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <InfoItem label="Expense Ratio" value="0.98%" />
        <InfoItem label="AUM" value="₹16,500 Cr" />
        <InfoItem label="Benchmark" value="NIFTY 50" />
        <InfoItem label="NAV" value="₹185.34" />
        <InfoItem label="Fund Manager" value="Raghav Gupta" />
        <InfoItem label="Rating" value="★★★★☆" />
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-gray-200 text-lg font-semibold">{value}</p>
    </div>
  );
}

function PerformanceSection({ fund }) {
  const returnsData = {
    labels: ["1Y", "3Y", "5Y"],
    datasets: [
      {
        label: "Returns %",
        data: [fund.oneYear, fund.threeYear, fund.fiveYear],
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96,165,250,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-6">
      <h2 className="text-2xl font-semibold mb-2">Performance Summary</h2>

      <div className="grid grid-cols-3 gap-6">
        <ReturnCard label="1 Year" value={fund.oneYear} color="text-green-400" />
        <ReturnCard label="3 Year" value={fund.threeYear} color="text-blue-400" />
        <ReturnCard label="5 Year" value={fund.fiveYear} color="text-yellow-400" />
      </div>

      {/* RETURNS CHART */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-4">Returns Chart</h3>
        <Suspense fallback={<p className="text-gray-400">Loading chart…</p>}>
          <LineChart data={returnsData} />
        </Suspense>
      </div>
    </div>
  );
}

function HoldingsSection({ holdings }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Top Holdings</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="py-2">Company</th>
            <th className="py-2">Allocation</th>
          </tr>
        </thead>

        <tbody>
          {holdings.map((h, index) => (
            <tr key={index} className="border-b border-gray-800">
              <td className="py-2">{h.company}</td>
              <td className="py-2">{h.allocation}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
