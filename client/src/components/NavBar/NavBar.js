import React from "react";
import Logo from "../../img/logo.png";
import s from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchGame, setLoading } from "../../actions";
import { setFilterActive } from "../../actions";

function NavBar() {
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.search.value;
    if (name) {
      dispatch(setLoading(false));
      dispatch(await searchGame(name));
      dispatch(setFilterActive({ genres: "", from: "", order: "" }));
      dispatch(setLoading(true));
      e.target.search.value = "";
    }
  };

  return (
    <div className={s.container}>
      <img src={Logo} alt="" />
      <form onSubmit={onSubmit} className={s.search}>
        <input name="search" placeholder="Search ..." />
        <button type="submit">Buscar</button>
      </form>
      <Link className={s.link} to="/home">
        <h4>Home</h4>
      </Link>
      <Link className={s.link} to="/create">
        <h4>Create</h4>
      </Link>
    </div>
  );
}

export default NavBar;
