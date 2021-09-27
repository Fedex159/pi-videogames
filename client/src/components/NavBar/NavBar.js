import React from "react";
import Logo from "../../img/logo.png";
import s from "./NavBar.module.css";
import { Link } from "react-router-dom";

function NavBar(props) {
  return (
    <div className={s.container}>
      <img src={Logo} alt="" />
      <div className={s.search}>
        <input name="search" placeholder="Nombre del juego" />
        <button>Buscar</button>
      </div>
      <Link to="/home">
        <h4>Home</h4>
      </Link>
      <Link to="/create">
        <h4>Create</h4>
      </Link>
    </div>
  );
}

export default NavBar;
