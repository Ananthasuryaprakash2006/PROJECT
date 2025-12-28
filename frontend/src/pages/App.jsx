import React, { useState, useEffect } from "react";
import axios from "axios";
import FundCard from "../components/FundCard";

export default function App() {
  const [funds, setFunds] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    amc: "",
    risk: "",
    sort: "",
    q: ""
  });

  useEffect(() => {
    loadFunds();
  }, [filters]);

  const loadFunds = async () => {
    const res = await axios.get("http://localhost:4000/api/funds", {
      params: filters
    });
    setFunds(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🔍 Fund Explorer</h1>

      {/* Filters Row */}
      <div style={{ display: "flex", gap: 15, marginTop: 20 }}>
        
        <input
          type="text"
          placeholder="Search funds..."
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
        />

        <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="">All Categories</option>
          <option value="Equity">Equity</option>
          <option value="Debt">Debt</option>
          <option value="Hybrid">Hybrid</option>
          <option value="ELSS">ELSS</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, risk: e.target.value })}>
          <option value="">All Risk Levels</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, sort: e.target.value })}>
          <option value="">Sort By</option>
          <option value="oneYear">Best 1-Year Returns</option>
          <option value="threeYear">Best 3-Year Returns</option>
          <option value="fiveYear">Best 5-Year Returns</option>
        </select>

      </div>

      {/* Fund Cards Grid */}
      <div
        style={{
          marginTop: 30,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20
        }}
      >
        {funds.map((fund) => (
          <FundCard key={fund.id} fund={fund} />
        ))}
      </div>
    </div>
  );
}
