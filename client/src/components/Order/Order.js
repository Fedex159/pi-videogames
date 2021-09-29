import React from "react";
import { useDispatch } from "react-redux";
import { filterGames } from "../../actions/index";

function Order() {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(filterGames(e.target.value));
  };

  return (
    <div>
      <button onClick={handleClick} value="A-Z">
        A-Z
      </button>
      <button onClick={handleClick} value="Z-A">
        Z-A
      </button>
      <button onClick={handleClick} value="Rating">
        Rating
      </button>
    </div>
  );
}

export default Order;
