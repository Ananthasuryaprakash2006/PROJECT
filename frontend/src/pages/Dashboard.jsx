import React, { useState } from "react";
import {
  TrendingUp,
  Wallet,
  Activity,
  BarChart3,
  PieChartIcon,
  RefreshCcw,
  Star,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const [tradeModal, setTradeModal] = useState({
    open: false,
    type: "",
    fund: "",
  });

  const [quantity, setQuantity] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const openTrade = (type, fund) => {
    setTradeModal({ open: true, type, fund });
  };

  const closeTrade = () => {
    setTradeModal({ open: false, type: "", fund: "" });
    setQuantity(1);
  };

  const refreshDashboard = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Dummy Data
  const growthData = [
    { month: "Jan", value: 250000 },
    { month: "Feb", value: 262000 },
    { month: "Mar", value: 270500 },
    { month: "Apr", value: 283000 },
    { month: "May", value: 290200 },
    { month: "Jun", value: 302800 },
  ];

  const holdingsData = [
    { name: "Equity", value: 45 },
    { name: "Debt", value: 25 },
    { name: "Gold", value: 15 },
    { name: "Hybrid", value: 10 },
    { name: "Others", value: 5 },
  ];

  const topFunds = [
    { name: "HDFC Midcap Opportunities", growth: "+18.2%" },
    { name: "Axis Bluechip Fund", growth: "+12.4%" },
    { name: "ICICI Gold ETF", growth: "+9.1%" },
  ];

  const COLORS = ["#34d399", "#60a5fa", "#facc15", "#a855f7", "#fb7185"];

  // Card Styling
  const cardClasses =
    "p-6 rounded-2xl bg-[#1A1D23]/80 backdrop-blur-xl border border-gray-800 hover:border-emerald-500/60 transition-all shadow-[0_0_10px_#10b98133]";

  return (
    <div className="relative w-full min-h-screen p-8 text-gray-100 overflow-hidden">

      {/* 🌌 BASE64 GRID BACKGROUND (NO IMAGE REQUEST) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage:
              "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////////8WhvCAAAAAD3RSTlMAAQIDBAUGBwgJCgsMDQ0c01qmAAAANElEQVQY02NgYGBgZGJiZmBkYGBgYGBg+Pn5+QYGhkYmJhYWBkYOBkYmBgYGJiZGBgYGBgAADrWQ0NwIkD7gAAAABJRU5ErkJggg==')",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ✨ FLOATING PARTICLES */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400/40 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [-10, window.innerHeight + 10],
            opacity: [0.1, 0.5, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* HEADER */}
      <div className="relative z-10 flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Track your investments & insights</p>
        </div>

        <button
          onClick={refreshDashboard}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1f1f1f] hover:bg-[#252525] border border-gray-700 text-gray-300"
        >
          <RefreshCcw
            className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* INSIGHT BAR */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl bg-[#10221a] border border-emerald-600/30 shadow-[0_0_12px_#10b98133] mb-8"
      >
        <p className="text-emerald-300 font-medium">
          💡 AI Insight: Your portfolio is showing steady upward momentum with strong mid-cap performance.
        </p>
      </motion.div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">

        {/* CARD 1 */}
        <motion.div whileHover={{ scale: 1.03 }} className={cardClasses}>
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="w-6 h-6 text-emerald-400" />
            <p className="text-gray-400">Total Investment</p>
          </div>
          <h2 className="text-3xl font-bold">₹ 2,45,000</h2>

          {/* Sparkline */}
          <div className="mt-4 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* CARD 2 */}
        <motion.div whileHover={{ scale: 1.03 }} className={cardClasses}>
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            <p className="text-gray-400">Current Value</p>
          </div>
          <h2 className="text-3xl font-bold">₹ 3,12,800</h2>

          <div className="mt-4 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <Line type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* CARD 3 */}
        <motion.div whileHover={{ scale: 1.03 }} className={cardClasses}>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-yellow-400" />
            <p className="text-gray-400">Total Returns</p>
          </div>
          <h2 className="text-3xl font-bold text-emerald-400">+₹ 67,800</h2>

          <div className="mt-4 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <Line type="monotone" dataKey="value" stroke="#facc15" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* CARD 4 */}
        <motion.div whileHover={{ scale: 1.03 }} className={cardClasses}>
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-6 h-6 text-purple-400" />
            <p className="text-gray-400">Active Funds</p>
          </div>
          <h2 className="text-3xl font-bold">8</h2>

          <div className="mt-4 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <Line type="monotone" dataKey="value" stroke="#a855f7" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">

        {/* Line Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cardClasses}
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold">Portfolio Growth</h3>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2f38" />
              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderRadius: 8 }} />
              <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cardClasses}
        >
          <div className="flex items-center gap-2 mb-4">
            <PieChartIcon className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold">Holdings Breakdown</h3>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={holdingsData} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
                {holdingsData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* TOP PERFORMERS */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${cardClasses} mt-12`}>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          Top Performing Funds
        </h3>

        <div className="mt-4 space-y-3">
          {topFunds.map((f, i) => (
            <div key={i} className="flex justify-between items-center bg-[#0b1220] p-3 rounded-lg border border-gray-700">
              <p className="font-medium">{f.name}</p>
              <span className="text-emerald-400 font-bold">{f.growth}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* FUNDS TABLE */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${cardClasses} mt-10`}>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          Your Mutual Funds
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400">
                <th className="py-3 px-2">Fund Name</th>
                <th className="py-3 px-2">Category</th>
                <th className="py-3 px-2">Returns (3Y)</th>
                <th className="py-3 px-2">Invested</th>
                <th className="py-3 px-2">Current Value</th>
                <th className="py-3 px-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {[
                ["Axis Bluechip Fund", "Equity – Large Cap", "+12.4%", "₹20,000", "₹25,300"],
                ["HDFC Midcap Opportunities", "Equity – Mid Cap", "+18.2%", "₹15,000", "₹19,900"],
                ["ICICI Prudential Gold ETF", "Gold", "+9.1%", "₹10,000", "₹11,200"],
                ["SBI Equity Hybrid Fund", "Hybrid", "+7.5%", "₹8,000", "₹9,100"],
              ].map((row, i) => (
                <tr key={i} className="border-b border-gray-800 hover:bg-[#222831]/50 transition">
                  <td className="py-3 px-2 font-medium">{row[0]}</td>
                  <td className="py-3 px-2">{row[1]}</td>
                  <td className="py-3 px-2 text-emerald-400 font-semibold">{row[2]}</td>
                  <td className="py-3 px-2">{row[3]}</td>
                  <td className="py-3 px-2">{row[4]}</td>
                  <td className="py-3 px-2 flex gap-2">
                    <button
                      onClick={() => openTrade("buy", row[0])}
                      className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => openTrade("sell", row[0])}
                      className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* TRADE MODAL */}
      {tradeModal.open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-[#1A1D23] p-6 rounded-xl w-96 border border-gray-700"
          >
            <h2 className="text-lg font-semibold mb-4">
              {tradeModal.type === "buy" ? (
                <span className="text-emerald-400">Buy</span>
              ) : (
                <span className="text-red-400">Sell</span>
              )}{" "}
              {tradeModal.fund}
            </h2>

            <label className="block text-gray-300 mb-2 text-sm">Units</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-900 text-white border border-gray-700"
            />

            <div className="flex justify-end gap-3 mt-5">
              <button onClick={closeTrade} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white">
                Cancel
              </button>

              <button
                onClick={() => {
                  alert(`You ${tradeModal.type} ${quantity} units of ${tradeModal.fund}`);
                  closeTrade();
                }}
                className={`px-4 py-2 rounded text-white ${
                  tradeModal.type === "buy"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
