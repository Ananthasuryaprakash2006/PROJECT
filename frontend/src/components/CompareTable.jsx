import React from "react";

export default function CompareTable({ selectedFunds }) {
  if (!selectedFunds?.length)
    return (
      <p className="text-gray-400 text-center py-10">
        Select funds to compare.
      </p>
    );

  const riskColor = (level) => {
    if (!level) return "text-gray-300";
    const r = level.toLowerCase();
    if (r.includes("low")) return "text-emerald-400";
    if (r.includes("medium")) return "text-yellow-400";
    return "text-red-400";
  };

  const barWidth = (v) => {
    if (!v || isNaN(v)) return "0%";
    const x = Math.max(-10, Math.min(40, v));
    return `${(x + 10) * 2.5}%`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left border-separate border-spacing-y-4">
        <tbody>
          {/* FUND NAMES */}
          <tr>
            <td className="text-gray-400 font-semibold w-40">Fund</td>
            {selectedFunds.map((f) => (
              <td
                key={f.id}
                className="bg-[#0e151f]/60 border border-emerald-500/20 p-4 rounded-xl shadow-[0_0_10px_#10b98130]"
              >
                <p className="font-semibold text-gray-100 text-lg">{f.name}</p>
                <p className="text-gray-400 text-xs">{f.category}</p>
              </td>
            ))}
          </tr>

          {/* NAV */}
          <tr>
            <td className="text-gray-400 font-semibold">NAV</td>
            {selectedFunds.map((f) => (
              <td key={f.id}>
                <div className="bg-[#0f1624]/60 p-3 rounded-xl border border-emerald-500/10 text-gray-100 shadow-[0_0_6px_#10b98140]">
                  ₹{f.nav || "N/A"}
                </div>
              </td>
            ))}
          </tr>

          {/* RETURNS */}
          {["1Y", "3Y", "5Y"].map((period) => (
            <tr key={period}>
              <td className="text-gray-400 font-semibold">{period} Return</td>
              {selectedFunds.map((f) => {
                const value = f[`return${period.toLowerCase()}`];
                return (
                  <td key={f.id}>
                    <div className="space-y-1">
                      <p className={`text-sm ${value > 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {value ? `${value}%` : "N/A"}
                      </p>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: barWidth(value) }}
                        ></div>
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}

          {/* RISK */}
          <tr>
            <td className="text-gray-400 font-semibold">Risk Level</td>
            {selectedFunds.map((f) => (
              <td key={f.id}>
                <span className={`px-3 py-1 rounded-full bg-[#0e151f] border ${riskColor(f.risk)}`}>
                  {f.risk || "N/A"}
                </span>
              </td>
            ))}
          </tr>

          {/* EXPENSE */}
          <tr>
            <td className="text-gray-400 font-semibold">Expense Ratio</td>
            {selectedFunds.map((f) => (
              <td key={f.id}>
                <span className="px-3 py-1 rounded-lg bg-[#101821] border border-gray-700 text-gray-200">
                  {f.expenseRatio ? `${f.expenseRatio}%` : "N/A"}
                </span>
              </td>
            ))}
          </tr>

          {/* AUM */}
          <tr>
            <td className="text-gray-400 font-semibold">AUM</td>
            {selectedFunds.map((f) => (
              <td key={f.id}>
                <span className="px-3 py-1 rounded-lg bg-[#0e151f] border border-gray-700 text-gray-300">
                  ₹{f.aum || "N/A"}
                </span>
              </td>
            ))}
          </tr>

          {/* TYPE */}
          <tr>
            <td className="text-gray-400 font-semibold">Type</td>
            {selectedFunds.map((f) => (
              <td key={f.id}>
                <span className="px-3 py-1 rounded-lg bg-[#101821] text-gray-200 border border-gray-700">
                  {f.type || "N/A"}
                </span>
              </td>
            ))}
          </tr>

        </tbody>
      </table>
    </div>
  );
}
