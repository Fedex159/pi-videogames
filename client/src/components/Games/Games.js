import React from "react";
import { useEffect } from "react";
import { gamesPage } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import Game from "../Game/Game";
import s from "./Games.module.css";

function Games() {
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.gamesPage);
  const page = useSelector((state) => state.page);
  const gamesFilters = useSelector((state) => state.gamesFilters);

  useEffect(() => {
    dispatch(gamesPage(page));
    // eslint-disable-next-line
  }, [page, gamesFilters]);

  return (
    <div className={s.container}>
      {pages &&
        loading &&
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
