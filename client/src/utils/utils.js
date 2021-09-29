function validateUUID(id) {
  if (typeof id !== "string") return false;
  const REGEX = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g;
  return REGEX.test(id);
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
