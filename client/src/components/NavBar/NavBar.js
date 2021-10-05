import React from "react";
import Logo from "../../img/logo.png";
import s from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchGame, setLoading } from "../../actions";
import { setFilterActive } from "../../actions";

function NavBar() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.search.value;
    if (name && !loading) {
      dispatch(setLoading(true));
      dispatch(await searchGame(name));
      dispatch(setFilterActive({ genres: "", from: "", order: "" }));
      dispatch(setLoading(false));
      e.target.search.value = "";
    }
  };

  return (
    <div className={s.container}>
      <img src={Logo} alt="" />
      <form onSubmit={onSubmit} className={s.search}>
        {loading && <input disabled name="search" placeholder="Search ..." />}
        {!loading && <input name="search" placeholder="Search ..." />}
        <button type="submit">Buscar</button>
      </form>
      <Link className={s.link} to="/create">
        <h4>Create</h4>
      </Link>
    </div>
  );
}

export default NavBar;
