import axios from "axios";

// export const ADD_GAME = "AddGame";
export const GET_GAMES = "GetGames";
export const GAMES_PAGE = "GamesPage";
// export const GET_GENRES = "GetGenres";
// export const GET_PLATFORMS = "GetPlatforms";
// export const GET_DETAIL = "GetDetail";
// export const FILTER_GAMES = "FilterGames";

export const getGames = async () => {
  try {
    const response = await axios.get("http://localhost:3001/videogames");
    return {
      type: GET_GAMES,
      payload: response.data,
    };
  } catch (e) {
    console.log("Error getGames", e);
  }
};

export const gamesPage = (payload) => {
  return {
    type: GAMES_PAGE,
    payload: payload,
  };
};
