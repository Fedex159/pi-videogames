import React from "react";
import NavBar from "../NavBar/NavBar";
import Games from "../Games/Games";
import { useState } from "react";
import { connect } from "react-redux";
import Filters from "../Filters/Filters";
import s from "./Home.module.css";

function Home({ games }) {
  const [state, setState] = useState({ page: 0 });

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.name === "pagedown") {
      if (state.page > 0) {
        setState((prev) => {
          return { ...prev, page: prev.page - 1 };
        });
      }
    } else {
      if (state.page * 15 + 15 <= games.length) {
        setState((prev) => {
          return { ...prev, page: prev.page + 1 };
        });
      }
    }
  };

  return (
    <div className={s.container}>
      <div className={s.navbar}>
        <NavBar />
      </div>
      <div className={s.filters}>
        <Filters />
      </div>
      <div className={s.games}>
        <Games page={state.page} />
      </div>
      <div className={s.pages}>
        <button onClick={handleClick} name="pagedown">
          Ant
        </button>
        <span>{state.page}</span>
        <button onClick={handleClick} name="pageup">
          Sig
        </button>
      </div>
      {/* <Genres />
      <select name="create">
        <option value="none" disabled hidden>
          Create by
        </option>
        <option>Own</option>
        <option>Api</option>
      </select>

      <select name="order">
        <option value="none" disabled hidden>
          Order
        </option>
        <option>A-Z</option>
        <option>Z-A</option>
        <option>Rating</option>
      </select> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
  };
};

export default connect(mapStateToProps, null)(Home);
