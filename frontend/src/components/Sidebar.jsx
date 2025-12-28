import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Star,
  Search,
  BarChart2,
  TrendingUp,
  Bot,
  User,
  ChevronRight
} from "lucide-react";

import { SparklesIcon } from "@heroicons/react/24/solid";   // ✅ FIXED IMPORT

import logo from "../assets/xfunds-logo.png";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.classList.add("sidebar-open");
    else document.body.classList.remove("sidebar-open");
  }, [open]);

  const menuItems = [
    { label: "AI Chat", to: "/ai-chat", icon: <SparklesIcon className="h-6 w-6 text-cyan-400" /> },  // ✅ FIXED path→to

    { label: "Dashboard", to: "/", icon: <LayoutDashboard size={22} /> },
    { label: "Watchlist", to: "/watchlist", icon: <Star size={22} /> },
    { label: "Fund Explorer", to: "/fund-explorer", icon: <Search size={22} /> },
    { label: "Compare", to: "/compare", icon: <BarChart2 size={22} /> },
    { label: "Analytics", to: "/analytics", icon: <TrendingUp size={22} /> },
    { label: "AI Advisor", to: "/ai-advisor", icon: <Bot size={22} /> },
    { label: "Profile", to: "/profile", icon: <User size={22} /> }
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen z-50 bg-[#0D0F14] border-r border-[#1d2028]
      shadow-[0_0_15px_#00ffbf20] transition-all duration-500 flex flex-col
      ${open ? "w-64" : "w-20"}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6 relative">
        <img
          src={logo}
          className={`transition-all duration-500 ${
            open ? "w-12" : "w-8 mx-auto"
          }`}
        />

        {open && (
          <span className="text-base font-semibold text-green-400 tracking-wide">
            XFUNDS
          </span>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="absolute -right-3 top-8 bg-gray-800 text-white p-1 rounded-full"
        >
          <ChevronRight
            size={18}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2 mt-4 px-2">
        {menuItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl transition-all group
              ${
                isActive
                  ? "bg-[#00ffaa20] border border-[#00ffbf60] shadow-[0_0_12px_#00ffbf80] text-white"
                  : "text-gray-300 hover:bg-[#1a1d25]"
              }`
            }
          >
            <span className="text-[#00ffbf]">{item.icon}</span>
            {open && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
