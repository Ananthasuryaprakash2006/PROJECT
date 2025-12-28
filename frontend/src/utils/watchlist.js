export const getWatchlist = () =>
  JSON.parse(localStorage.getItem("watchlist") || "[]");

export const toggleWatchlist = (id) => {
  let list = getWatchlist();

  if (list.includes(id)) {
    list = list.filter((x) => x !== id);
  } else {
    list.push(id);
  }

  localStorage.setItem("watchlist", JSON.stringify(list));
  return list;
};

export const isInWatchlist = (id) => getWatchlist().includes(id);
