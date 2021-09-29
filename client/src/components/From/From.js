import React from "react";
import { filterGames, filterActive } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { handleClickFilters } from "../../utils/utils";

function From() {
  const active = useSelector((state) => state.filterActive);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    handleClickFilters(e, active, dispatch, filterActive, filterGames);
  };

  return (
    <div>
      <button
        className={active === "DB" && "active-button"}
        onClick={handleClick}
        value="DB"
      >
        DB
      </button>
      <button
        className={active === "API" && "active-button"}
        onClick={handleClick}
        value="API"
      >
        API
      </button>
    </div>
  );
}

export default From;
