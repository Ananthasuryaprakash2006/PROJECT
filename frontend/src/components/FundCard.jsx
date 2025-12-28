import React from "react";
import { Link } from "react-router-dom";
import { amcLogos } from "../utils/amcLogos";
import { isInWatchlist, toggleWatchlist } from "../utils/watchlist";

export default function FundCard({ fund }) {
  if (!fund) return null;

  // Safe fallback image
  const logo = amcLogos[fund.amc] || "https://i.ibb.co/4Y0bH7J/default-amc.png";

  return (
    <div
      className="
        p-5 rounded-2xl
        bg-[rgba(255,255,255,0.04)]
        border border-[rgba(255,255,255,0.08)]
        backdrop-blur-xl
        shadow-lg
        hover:border-cyan-400 hover:scale-[1.02]
        transition-all duration-300
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* AMC LOGO */}
          <img
            src={logo}
            alt="AMC Logo"
            className="w-12 h-12 rounded-full border border-gray-700 object-cover"
            loading="lazy"
          />

          <div>
            <h2 className="text-lg font-bold text-white">{fund.name}</h2>
            <p className="text-gray-400 text-xs">{fund.amc}</p>
          </div>
        </div>

        {/* Watchlist Button */}
        <button
          onClick={() => {
            toggleWatchlist(fund.id);
            window.dispatchEvent(new Event("watchlistUpdate"));
          }}
          className="text-yellow-400 text-2xl hover:scale-125 transition"
        >
          {isInWatchlist(fund.id) ? "★" : "☆"}
        </button>
      </div>

      {/* Category & Risk */}
      <p className="text-gray-400 mt-3 text-sm">
        {fund.category} • <span className="text-cyan-300">{fund.risk} Risk</span>
      </p>

      {/* Returns */}
      <div className="mt-5 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-emerald-400 font-bold">{fund.oneYear}%</p>
          <p className="text-gray-500 text-xs">1Y</p>
        </div>
        <div>
          <p className="text-blue-400 font-bold">{fund.threeYear}%</p>
          <p className="text-gray-500 text-xs">3Y</p>
        </div>
        <div>
          <p className="text-yellow-400 font-bold">{fund.fiveYear}%</p>
          <p className="text-gray-500 text-xs">5Y</p>
        </div>
      </div>

      {/* Button */}
      <Link
        to={`/fund/${fund.id}`}
        className="
          mt-5 block w-full text-center py-2 rounded-xl
          bg-cyan-600 hover:bg-cyan-700
          transition font-semibold
        "
      >
        View Details
      </Link>
    </div>
  );
}
