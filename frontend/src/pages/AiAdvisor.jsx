import React, { useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  LightBulbIcon,
  ChartBarIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function AiAdvisor() {
  const [goal, setGoal] = useState("");
  const [risk, setRisk] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const fetchAdvice = async () => {
    if (!goal || !risk || !duration) return;

    setLoading(true);
    setRecommendations([]);

    try {
      const res = await axios.get(
        `/ai/advice?goal=${goal}&risk=${risk}&duration=${duration}`
      );
      setRecommendations(res.data);
    } catch (error) {
      console.error("AI Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="px-6 py-10 space-y-10">
      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"
      >
        AI Investment Advisor
      </motion.h1>

      {/* INPUT GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        <SelectBox
          label="Your Investment Goal"
          value={goal}
          setValue={setGoal}
          icon={<LightBulbIcon className="w-5 h-5 text-cyan-300" />}
          options={["Wealth Growth", "Tax Saving", "Safe Returns", "Long-Term Build"]}
        />

        <SelectBox
          label="Risk Appetite"
          value={risk}
          setValue={setRisk}
          icon={<ShieldCheckIcon className="w-5 h-5 text-cyan-300" />}
          options={["Low", "Medium", "High"]}
        />

        <SelectBox
          label="Duration"
          value={duration}
          setValue={setDuration}
          icon={<ChartBarIcon className="w-5 h-5 text-cyan-300" />}
          options={["Short", "Medium", "Long"]}
        />
      </div>

      {/* BUTTON */}
      <motion.button
        onClick={fetchAdvice}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3 rounded-xl text-black font-semibold bg-gradient-to-r 
                  from-cyan-400 to-emerald-400 hover:opacity-90 transition-all"
      >
        {loading ? "Generating AI Insights..." : "Get AI Recommendations"}
      </motion.button>

      {/* RESULTS */}
      {recommendations.length > 0 && (
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold text-emerald-400 mt-10"
        >
          Personalized Recommendations
        </motion.h2>
      )}

      <div className="space-y-8">
        {recommendations.map((rec, index) => (
          <RecommendationCard key={index} rec={rec} index={index} />
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   PREMIUM SELECT BOX
----------------------------------------------------------- */
function SelectBox({ label, value, setValue, options, icon }) {
  return (
    <div className="glass-tile p-5 rounded-2xl border border-cyan-500/20">
      <label className="text-gray-300 flex gap-2 items-center mb-2">
        {icon} {label}
      </label>

      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 rounded-xl bg-black/20 border border-cyan-500/20
                   text-gray-200 focus:outline-none"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

/* -----------------------------------------------------------
   ANIMATED RECOMMENDATION CARD
----------------------------------------------------------- */
function RecommendationCard({ rec, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      className="glass-tile p-6 rounded-2xl border border-emerald-400/20 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-3">
        <SparklesIcon className="w-6 h-6 text-emerald-300" />
        <h3 className="text-xl font-semibold text-white">{rec.title}</h3>
      </div>

      <p className="text-gray-300 mb-4">{rec.description}</p>

      <div className="flex flex-wrap gap-3 mt-3">
        {rec.funds.map((f, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="px-4 py-1 rounded-full bg-gradient-to-r from-emerald-400/20 
                       to-cyan-400/20 border border-cyan-400/20 text-cyan-300"
          >
            {f}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/* -----------------------------------------------------------
   CSS TO ADD IN index.css
----------------------------------------------------------- */
/*
.glass-tile {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(14px);
  border-radius: 18px;
}
*/
