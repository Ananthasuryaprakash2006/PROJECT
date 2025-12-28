import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Trash2, Search, Plus } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [query, setQuery] = useState("");

  // ---------------------------
  // ⭐ FIXED: topFunds re-added
  // ---------------------------
  const topFunds = [
    { name: "HDFC Midcap Opportunities", growth: "+18.2%" },
    { name: "Axis Bluechip Fund", growth: "+12.4%" },
    { name: "ICICI Gold ETF", growth: "+9.1%" }
  ];

  // fallback sample data
  const sample = [
    {
      id: "axis-bluechip",
      name: "Axis Bluechip Fund",
      category: "Equity - Large Cap",
      score: 88,
      chart: [
        { name: "Jan", value: 20 },
        { name: "Feb", value: 25 },
        { name: "Mar", value: 22 },
        { name: "Apr", value: 28 },
        { name: "May", value: 30 },
      ],
    },
    {
      id: "hdfc-midcap",
      name: "HDFC Midcap Opportunities",
      category: "Equity - Mid Cap",
      score: 92,
      chart: [
        { name: "Jan", value: 15 },
        { name: "Feb", value: 20 },
        { name: "Mar", value: 23 },
        { name: "Apr", value: 26 },
        { name: "May", value: 31 },
      ],
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("xf_watchlist_v1");
    if (saved) {
      setWatchlist(JSON.parse(saved));
    } else {
      setWatchlist(sample);
      localStorage.setItem("xf_watchlist_v1", JSON.stringify(sample));
    }
  }, []);

  const removeFund = (id) => {
    const updated = watchlist.filter((f) => f.id !== id);
    setWatchlist(updated);
    localStorage.setItem("xf_watchlist_v1", JSON.stringify(updated));
  };

  const filtered = watchlist.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full min-h-screen p-8 text-gray-100">

      {/* background */}
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

      {/* header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Star className="text-emerald-400" />
          Watchlist
        </h1>

        <div className="flex items-center bg-[#0b1220] rounded-lg px-3 py-2 border border-gray-700">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            className="bg-transparent outline-none text-gray-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search funds"
          />
        </div>
      </div>

      {/* WATCHLIST CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((fund) => (
          <motion.div
            key={fund.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-xl bg-[#0b1220]/80 border border-gray-800 shadow-[0_0_12px_#10b98120]"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{fund.name}</h2>
                <p className="text-sm text-gray-400">{fund.category}</p>
              </div>

              <div className="px-3 py-1 rounded-lg bg-emerald-600/30 text-emerald-300 font-semibold">
                {fund.score}
              </div>
            </div>

            <div className="mt-4 w-full h-28">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fund.chart}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#34d399"
                    strokeWidth={2}
                    dot={false}
                  />
                  <CartesianGrid stroke="#1a1f29" vertical={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#0b1220" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <button
              onClick={() => removeFund(fund.id)}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white flex items-center gap-2"
            >
              <Trash2 size={16} /> Remove
            </button>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center mt-10 text-gray-400">No funds found.</p>
      )}

      {/* TOP FUNDS SIDEBAR (optional section) */}
      <div className="mt-10 p-5 rounded-xl bg-[#0b1220]/80 border border-gray-700 max-w-md">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" /> Top Funds
        </h2>

        {topFunds.map((f, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-[#101621] p-3 rounded-lg border border-gray-700 mb-2"
          >
            <p>{f.name}</p>
            <span className="text-emerald-400 font-semibold">{f.growth}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
