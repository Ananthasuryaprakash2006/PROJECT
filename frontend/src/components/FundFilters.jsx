import React from "react";

export default function FundFilters({ typeFilter, setTypeFilter, search, setSearch }) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 text-sm">
      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2"
      >
        <option value="All">All Types</option>
        <option value="Equity">Equity</option>
        <option value="Debt">Debt</option>
        <option value="Hybrid">Hybrid</option>
      </select>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by fund name..."
        className="flex-1 min-w-[180px] bg-gray-900 border border-gray-700 rounded-lg px-3 py-2"
      />
    </div>
  );
}