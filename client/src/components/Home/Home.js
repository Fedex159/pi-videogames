import React from "react";
import NavBar from "../NavBar/NavBar";
import Games from "../Games/Games";
import { useState } from "react";
import { connect } from "react-redux";

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
    <div>
      <NavBar />
      <select name="genre">
        <option value="none" selected disabled hidden>
          Genre
        </option>
        <option>Genre1</option>
        <option>Genre2</option>
      </select>
      <select name="create">
        <option value="none" selected disabled hidden>
          Create by
        </option>
        <option>Own</option>
        <option>Api</option>
      </select>

      <select name="order">
        <option value="none" selected disabled hidden>
          Order
        </option>
        <option>A-Z</option>
        <option>Z-A</option>
        <option>Rating</option>
      </select>
      <Games page={state.page} />
      <div>
        <button onClick={handleClick} name="pagedown">
          Ant
        </button>
        <span>{state.page}</span>
        <button onClick={handleClick} name="pageup">
          Sig
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
  };
};

export default connect(mapStateToProps, null)(Home);
