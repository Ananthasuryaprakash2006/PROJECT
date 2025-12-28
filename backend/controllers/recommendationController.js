export const recommendFunds = (req, res) => {
  const { risk } = req.body;
  let funds = req.loadFunds();

  if (risk) funds = funds.filter((f) => f.risk === risk);

  res.json(funds.slice(0, 5));
};
