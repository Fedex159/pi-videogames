import { GET_GAMES, GAMES_PAGE } from "../actions";

const initialState = {
  games: [],
  gamesPage: [],
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
        gamesPage: state.games.slice(i, i + 15),
      };
    }
    default:
      return state;
  }
};

export default games;
