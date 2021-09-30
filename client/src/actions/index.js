import axios from "axios";

// export const ADD_GAME = "AddGame";
export const GET_GAMES = "GetGames";
export const GAMES_PAGE = "GamesPage";
export const GET_GENRES = "GetGenres";
// export const GET_PLATFORMS = "GetPlatforms";
// export const GET_DETAIL = "GetDetail";
export const FILTER_GAMES = "FilterGames";
export const FILTER_ACTIVE = "FilterActive";
export const FILTER_RESET = "FilterReset";
export const SET_PAGE = "SetPage";
export const SEARCH_GAME = "SearchGame";
export const SET_SEARCH_STATE = "SetSearchState";

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

export const getGenres = async () => {
  try {
    const response = await axios.get("http://localhost:3001/genres");
    return {
      type: GET_GENRES,
      payload: response.data,
    };
  } catch (e) {
    console.log("Error getGenres", e);
  }
};

export const filterGames = (payload) => {
  return {
    type: FILTER_GAMES,
    payload: payload,
  };
};

export const filterReset = () => {
  return {
    type: FILTER_RESET,
  };
};

export const setFilterActive = (payload) => {
  return {
    type: FILTER_ACTIVE,
    payload: payload,
  };
};

export const setPage = (payload) => {
  return {
    type: SET_PAGE,
    payload: payload,
  };
};

export const searchGame = async (name) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/videogames?name=${name}`
    );
    return {
      type: SEARCH_GAME,
      payload: response.data,
    };
  } catch (e) {
    console.log("Error searchGame", e);
  }
};

export const setSearchState = (payload) => {
  return {
    type: SET_SEARCH_STATE,
    payload: payload,
  };
};
