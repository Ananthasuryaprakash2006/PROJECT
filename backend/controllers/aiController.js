import riskMap from "../utils/riskMap.js";
import { computeReturnScore } from "../utils/scoring.js";

export const getAdvice = (req, res) => {
  const { goal, risk, duration } = req.query;

  const funds = req.loadFunds();

  if (!goal || !risk || !duration) {
    return res.status(400).json({ error: "Missing goal, risk or duration" });
  }

  // Score each fund
  const ranked = funds
    .map((f) => {
      const score =
        computeReturnScore(f) +
        (f.aum || 0) * 0.0001 -
        (f.expenseRatio || 0) * 2 -
        (riskMap[f.risk] || 50) * 0.4;

      return { ...f, aiScore: score };
    })
    .sort((a, b) => b.aiScore - a.aiScore);

  // ---- FILTER BY RISK ----
  let profileFiltered = ranked;
  if (risk === "Low") profileFiltered = ranked.filter((f) => f.risk === "Low");
  else if (risk === "Medium")
    profileFiltered = ranked.filter((f) => f.risk !== "High");

  // ---- SAFETY FALLBACK ----
  if (profileFiltered.length < 3) profileFiltered = ranked.slice(0, 5);

  const top5 = profileFiltered.slice(0, 5).map((f) => f.name);
  const alt3 = ranked.slice(5, 8).map((f) => f.name);

  const response = [
    {
      title: "Best Funds Based on Your Profile",
      description: `Your goal (${goal}), risk preference (${risk}), and investment duration (${duration}) suggest these funds may suit you.`,
      funds: top5,
    },
    {
      title: "Alternative Options",
      description:
        "These funds also match elements of your profile and provide diversification opportunities.",
      funds: alt3,
    },
    {
      title: "Risk Suitability Insights",
      description:
        risk === "Low"
          ? "Low-risk funds chosen to maximize stability and minimize volatility."
          : risk === "Medium"
          ? "Balanced mix of growth and stability funds selected."
          : "High-risk preference allows us to recommend aggressive growth funds.",
      funds: profileFiltered.slice(0, 3).map((f) => f.name),
    },
  ];

  res.json(response);
};
