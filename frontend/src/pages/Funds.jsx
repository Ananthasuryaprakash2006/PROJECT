import React, { useEffect, useState } from "react";
import api from "../api/axios";
import FundCard from "../components/FundCard";

export default function Funds() {
  const [funds, setFunds] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFunds = async () => {
      try {
        const res = await api.get("/funds");

        console.log("Funds API response:", res.data);

        // ---- SAFETY CHECKS ----
        if (!res || !res.data) {
          console.error("No data received from backend");
          setFunds([]);
        } else if (Array.isArray(res.data)) {
          setFunds(res.data);
        } else if (Array.isArray(res.data.funds)) {
          setFunds(res.data.funds);
        } else {
          console.error("Unexpected API format:", res.data);
          setFunds([]);
        }
      } catch (err) {
        console.error("Error loading funds:", err);
        setFunds([]);
      }

      setLoading(false);
    };

    loadFunds();
  }, []);

  // ---- FIX THE FILTER ERROR ----
  const safeFunds = Array.isArray(funds) ? funds : [];

  const filteredFunds = safeFunds.filter((f) =>
    f.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-4">All Funds</h1>

      <input
        type="text"
        placeholder="Search funds..."
        className="w-full p-3 mb-6 bg-gray-800 rounded-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p className="text-gray-400">Loading funds...</p>
      ) : filteredFunds.length === 0 ? (
        <p className="text-gray-400">No matching funds found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFunds.map((fund) => (
            <FundCard key={fund.id} fund={fund} />
          ))}
        </div>
      )}
    </div>
  );
}
