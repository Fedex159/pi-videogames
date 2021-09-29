import React from "react";
import { useDispatch } from "react-redux";
import { filterGames } from "../../actions/index";

function From() {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(filterGames(e.target.value));
  };
  return (
    <div>
      <button onClick={handleClick} value="DB">
        DB
      </button>
      <button onClick={handleClick} value="API">
        API
      </button>
    </div>
  );
}

export default From;
