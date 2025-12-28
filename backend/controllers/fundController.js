export const getFunds = (req, res) => {
  try {
    res.json(req.loadFunds());
  } catch {
    res.status(500).json({ error: "Failed to load funds" });
  }
};

export const getFundById = (req, res) => {
  try {
    const funds = req.loadFunds();
    const fund = funds.find((f) => f.id == req.params.id);

    fund
      ? res.json(fund)
      : res.status(404).json({ error: "Fund not found" });
  } catch {
    res.status(500).json({ error: "Failed to load fund" });
  }
};
