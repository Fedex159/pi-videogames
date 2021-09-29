function validateUUID(id) {
  if (typeof id !== "string") return false;
  const REGEX = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g;
  return REGEX.test(id);
}

export function validatePage(page, length, action) {
  if (action === "prev") {
    if (page > 0) return true;
    return false;
  } else if (action === "next") {
    if (page >= 0 && page * 15 + 15 <= length) return true;
    return false;
  }
  return false;
}

function orderStr(a, b) {
  if (a.toLowerCase() > b.toLowerCase()) {
    return 1;
  }
  if (a.toLowerCase() < b.toLowerCase()) {
    return -1;
  }
  return 0;
}

export function filterG(games, type) {
  switch (type) {
    case "":
      return games;
    case "A-Z":
      return [...games].sort((a, b) => {
        return orderStr(a.name, b.name);
      });
    case "Z-A":
      return [...games].sort((a, b) => {
        return orderStr(b.name, a.name);
      });
    case "Rating":
      return [...games].sort((a, b) => {
        return orderStr(b.rating.toString(), a.rating.toString());
      });
    case "DB":
    case "API":
      return games.filter((game) =>
        type === "DB" ? validateUUID(game.id) : !validateUUID(game.id)
      );
    default:
      return games.filter(
        (game) => game.genres.findIndex((genre) => genre.name === type) >= 0
      );
  }
}

export function handleClickFilters(
  event,
  active,
  dispatch,
  filterActive,
  filterGames
) {
  event.preventDefault();
  console.log(event.target.value);
  if (active === event.target.value) {
    dispatch(filterActive(""));
    dispatch(filterGames(""));
  } else {
    dispatch(filterActive(event.target.value));
    dispatch(filterGames(event.target.value));
  }
}
