import React from "react";

export default function Advisor() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Advisor & Education Space</h2>
      <p className="text-gray-300 text-sm">
        Area for financial advisors to publish educational content, model portfolios
        and respond to investor questions.
      </p>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 space-y-2">
          <p className="font-semibold">Featured Learning Path</p>
          <ol className="list-decimal list-inside space-y-1 text-gray-300 text-sm">
            <li>What is a mutual fund?</li>
            <li>Understanding NAV, SIP & lump-sum</li>
            <li>Types of risks in mutual funds</li>
            <li>How to read a fund factsheet</li>
            <li>Designing a goal-based portfolio</li>
          </ol>
        </div>
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 space-y-2">
          <p className="font-semibold">Sample Model Portfolios</p>
          <ul className="space-y-2 text-gray-300">
            <li>
              <span className="font-semibold">Conservative:</span> 70% Debt, 20% Hybrid, 10% Equity
            </li>
            <li>
              <span className="font-semibold">Balanced:</span> 40% Equity, 40% Hybrid, 20% Debt
            </li>
            <li>
              <span className="font-semibold">Aggressive:</span> 80% Equity, 10% Hybrid, 10% Debt
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}