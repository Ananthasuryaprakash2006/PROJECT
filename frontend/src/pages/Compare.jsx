import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import CompareTable from "../components/CompareTable";
import ComparisonCharts from "../components/ComparisonCharts";

export default function Compare() {
  const [funds, setFunds] = useState([]);
  const [selectedFunds, setSelectedFunds] = useState([]);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const res = await axios.get("/funds");
        setFunds(res.data);
      } catch (error) {
        console.error("Error loading funds:", error);
      }
    };

    fetchFunds();
  }, []);

  const toggleSelect = (fund) => {
    let updated = [...selectedFunds];

    if (updated.find((f) => f.id === fund.id)) {
      updated = updated.filter((f) => f.id !== fund.id);
    } else if (updated.length < 3) {
      updated.push(fund);
    }

    setSelectedFunds(updated);
  };

  return (
    <div className="p-6 space-y-10">

      <h1 className="text-3xl font-extrabold text-cyan-400">Compare Funds</h1>
      <p className="text-gray-400">
        Select up to three funds and compare returns, risk, AUM & overall score.
      </p>

      {/* FUND LIST */}
      <div className="grid md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto p-2">
        {funds.map((fund) => (
          <div
            key={fund.id}
            onClick={() => toggleSelect(fund)}
            className={`p-4 cursor-pointer rounded-xl glass-tile border 
              ${
                selectedFunds.find((f) => f.id === fund.id)
                  ? "border-cyan-400 shadow-[0_0_12px_#00eaff60]"
                  : "border-gray-700"
              }`}
          >
            <h2 className="font-semibold text-white">{fund.name}</h2>
            <p className="text-gray-400 text-sm">{fund.category || "N/A"}</p>
          </div>
        ))}
      </div>

      {/* COMPARISON TABLE */}
      <CompareTable selectedFunds={selectedFunds} />

      {/* CHART CONTAINER FIXED */}
      <div
        className="glass-tile p-6 rounded-xl border border-cyan-400/20 shadow-xl"
        style={{ minHeight: "420px" }}
      >
        <ComparisonCharts funds={selectedFunds} />
      </div>
    </div>
  );
}
