import React from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getGames, gamesPage, filterGames } from "../../actions";
import Game from "../Game/Game";
import s from "./Games.module.css";

function Games({
  getGames,
  gamesPage,
  games,
  page,
  gamesAll,
  gamesFilters,
  filterGames,
}) {
  useEffect(() => {
    (async () => {
      await getGames();
      await filterGames("");
      await gamesPage(page);
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    try {
      (async () => {
        await gamesPage(page);
      })();
    } catch (e) {
      console.log("Error useEffect [page]", e);
    }
    // eslint-disable-next-line
  }, [page, gamesFilters]);

  return (
    <div className={s.container}>
      {games.map((game) => (
        <Game
          key={`${game.id}_${game.name}`}
          id={game.id}
          name={game.name}
          image={game.image}
          rating={game.rating}
          genres={game.genres}
        />
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    games: state.gamesPage,
    gamesAll: state.games,
    gamesFilters: state.gamesFilters,
    page: state.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGames: async () => dispatch(await getGames()),
    gamesPage: async (page) => dispatch(await gamesPage(page)),
    filterGames: async (type) => dispatch(await filterGames(type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Games);
