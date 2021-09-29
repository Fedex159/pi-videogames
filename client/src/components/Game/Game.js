import React from "react";
import s from "./Game.module.css";
import Template from "../../img/game_template.png";
import { Link } from "react-router-dom";

function Game({ id, name, image, genres, rating }) {
  return (
    <Link className={s.link} to={`/details/${id}`}>
      <div className={s.container}>
        <img src={image ? image : Template} alt="" />
        <span>{name}</span>
        <p>Rating {rating}</p>
        <ul>
          {genres &&
            genres.map((g) => <li key={`${name}_${g.id}`}>{g.name}</li>)}
        </ul>
      </div>
    </Link>
  );
}

export default Game;
