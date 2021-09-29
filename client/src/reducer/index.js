import {
  GET_GAMES,
  GAMES_PAGE,
  GET_GENRES,
  FILTER_GAMES,
  FILTER_ACTIVE,
  SET_PAGE,
} from "../actions";
import { filterG } from "../utils/utils";

const initialState = {
  games: [],
  gamesPage: [],
  genres: [],
  gamesFilters: [],
  page: 0,
  filterActive: "",
};

const games = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
      };
    case GAMES_PAGE: {
      // 1 => 0 a 14
      // 2 => 15 a 29
      // 3 => 30 a 44
      const i = action.payload * 15;
      return {
        ...state,
        gamesPage: state.gamesFilters.slice(i, i + 15),
      };
    }
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case FILTER_GAMES: {
      return {
        ...state,
        gamesFilters: filterG(state.games, action.payload),
      };
    }
    case SET_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case FILTER_ACTIVE:
      return {
        ...state,
        filterActive: action.payload,
      };

    default:
      return state;
  }
};

export default games;
