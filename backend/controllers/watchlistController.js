let watchlist = []; // simple in-memory storage

export const addToWatchlist = (req, res) => {
  const { fundId } = req.body;
  if (!watchlist.includes(fundId)) watchlist.push(fundId);
  res.json({ message: "Added to watchlist", watchlist });
};

export const getWatchlist = (req, res) => {
  const funds = req.loadFunds();
  const items = funds.filter((f) => watchlist.includes(f.id.toString()));
  res.json(items);
};

export const removeFromWatchlist = (req, res) => {
  watchlist = watchlist.filter((id) => id !== req.params.id);
  res.json({ message: "Removed from watchlist", watchlist });
};
