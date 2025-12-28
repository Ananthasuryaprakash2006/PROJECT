export const getTopPerformers = (req, res) => {
  const funds = req.loadFunds();
  const sorted = funds.sort((a, b) => b.return1y - a.return1y);
  res.json(sorted.slice(0, 5));
};

export const getLowRiskFunds = (req, res) => {
  const funds = req.loadFunds();
  res.json(funds.filter((f) => ["Low", "Moderate"].includes(f.risk)));
};
