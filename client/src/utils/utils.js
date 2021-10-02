import axios from "axios";

function validateUUID(id) {
  if (typeof id !== "string") return false;
  const REGEX = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g;
  return REGEX.test(id);
}

export function validatePage(page, length, action, search) {
  if (action === "prev" && search === "off") {
    if (page > 0) return true;
    return false;
  } else if (action === "next" && search === "off") {
    if (page >= 0 && page * 15 + 15 < length) return true;
    return false;
  }
  return false;
}

export function orderStr(a, b) {
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
        return orderStr(
          Number(b.rating).toString(),
          Number(a.rating).toString()
        );
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
  dispatch,
  filter,
  filterGames,
  setFilterActive
) {
  if (event.target.name === "order") {
    if (filter.order !== event.target.value) {
      console.log(event.target.value);
      dispatch(filterGames(event.target.value));
      dispatch(setFilterActive({ ...filter, order: event.target.value }));
    }
  } else {
    if (!filter[event.target.name]) {
      console.log(event.target.value);
      dispatch(filterGames(event.target.value));
      dispatch(
        setFilterActive({
          ...filter,
          [event.target.name]: event.target.value,
        })
      );
    }
  }
}

export async function getGameDetails(id) {
  try {
    const response = await axios.get(`http://localhost:3001/videogames/${id}`);
    return response.data;
  } catch (e) {
    console.log("Error getGameDetails", e);
  }
}
