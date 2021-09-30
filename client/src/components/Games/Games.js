import React from "react";
import { useEffect } from "react";
import {
  getGames,
  gamesPage,
  setSearchState,
  filterReset,
} from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import Game from "../Game/Game";
import s from "./Games.module.css";

function Games() {
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.gamesPage);
  const page = useSelector((state) => state.page);
  const gamesFilters = useSelector((state) => state.gamesFilters);

  useEffect(() => {
    (async () => {
      dispatch(setSearchState("off"));
      dispatch(await getGames());
      dispatch(filterReset());
      dispatch(gamesPage(page));
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(gamesPage(page));
    // eslint-disable-next-line
  }, [page, gamesFilters]);

  return (
    <div className={s.container}>
      {pages &&
        pages.map((game) => (
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

export default Games;
