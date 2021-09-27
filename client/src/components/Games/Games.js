import React from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getGames, gamesPage } from "../../actions";
import Game from "../Game/Game";
import s from "./Games.module.css";

function Games({ getGames, gamesPage, games, page }) {
  useEffect(async () => {
    await getGames();
    await gamesPage(page);
  }, []);

  useEffect(async () => {
    await gamesPage(page);
  }, [page]);

  return (
    <div className={s.container}>
      {games.map((game) => (
        <Game
          id={game.id}
          name={game.name}
          image={game.image}
          genres={game.genres}
        />
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    games: state.gamesPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGames: async () => dispatch(await getGames()),
    gamesPage: async (page) => dispatch(await gamesPage(page)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Games);
