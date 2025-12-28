import riskMap from "../utils/riskMap.js";
import { computeReturnScore } from "../utils/scoring.js";

export const compareFunds = (req, res) => {
  const { ids } = req.body;
  const funds = req.loadFunds().filter((f) =>
    ids.includes(f.id.toString())
  );
  res.json(funds);
};

export const getQuadrantData = (req, res) => {
  const funds = req.loadFunds();

  const data = funds.map((f) => ({
    name: f.name,
    risk: riskMap[f.risk] || 50,
    returnScore: computeReturnScore(f),
    size: Math.sqrt(f.aum || 1000) / 4,
  }));

  res.json(data);
};
