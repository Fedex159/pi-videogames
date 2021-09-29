import React from "react";
import { filterGames, filterActive } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { handleClickFilters } from "../../utils/utils";

function Order() {
  const active = useSelector((state) => state.filterActive);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    handleClickFilters(e, active, dispatch, filterActive, filterGames);
  };

  return (
    <div>
      <button
        className={active === "A-Z" && "active-button"}
        onClick={handleClick}
        value="A-Z"
      >
        A-Z
      </button>
      <button
        className={active === "Z-A" && "active-button"}
        onClick={handleClick}
        value="Z-A"
      >
        Z-A
      </button>
      <button
        className={active === "Rating" && "active-button"}
        onClick={handleClick}
        value="Rating"
      >
        Rating
      </button>
    </div>
  );
}

export default Order;
