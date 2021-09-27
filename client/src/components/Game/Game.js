import React from "react";
import s from "./Game.module.css";
import Template from "../../img/game_template.png";
import { Link } from "react-router-dom";

function Game({ id, name, image, genres }) {
  return (
    <Link className={s.link} to={`/details/${id}`}>
      <div className={s.container}>
        <img src={image ? image : Template} alt="" />
        <span>{name}</span>
        <ul>{genres && genres.map((g) => <li>{g.name}</li>)}</ul>
      </div>
    </Link>
  );
}

export default Game;
