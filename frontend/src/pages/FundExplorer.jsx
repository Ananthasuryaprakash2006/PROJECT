import React, { useEffect, useState } from "react";
import FundCard from "../components/FundCard";

export default function FundExplorer() {
  const [funds, setFunds] = useState([]);
  const [filteredFunds, setFilteredFunds] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/api/funds";

  /* -------------------- LOAD FUNDS -------------------- */
  useEffect(() => {
    async function loadFunds() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        console.log("FundExplorer API:", data);

        setFunds(data);
        setFilteredFunds(data);
      } catch (err) {
        console.error("❌ Error loading funds:", err);
      } finally {
        setLoading(false);
      }
    }

    loadFunds();
  }, []);

  /* -------------------- SEARCH FILTER -------------------- */
  useEffect(() => {
    const result = funds.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredFunds(result);
  }, [search, funds]);

  return (
    <div className="px-6 py-8">

      {/* HEADER */}
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Fund Explorer
      </h1>

      <p className="text-gray-400 mt-2">
        Explore mutual funds using advanced search & categorization.
      </p>

      {/* SEARCH BAR */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Search funds..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full md:w-1/2 px-4 py-3 rounded-xl
            bg-gray-900 border border-gray-700
            text-white placeholder-gray-500
            focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none
            transition
          "
        />
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-400 mt-8 text-center">Loading funds...</p>
      )}

      {/* NO RESULTS */}
      {!loading && filteredFunds.length === 0 && (
        <p className="text-gray-400 mt-8 text-center">
          No matching funds found.
        </p>
      )}

      {/* GRID LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {filteredFunds.map((fund) => (
          <FundCard key={fund.id} fund={fund} />
        ))}
      </div>
    </div>
  );
}
