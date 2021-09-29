import React from "react";
import { filterGames, filterActive } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { handleClickFilters } from "../../utils/utils";

function Genres({ genres }) {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.filterActive);

  const handleClick = (e) => {
    handleClickFilters(e, active, dispatch, filterActive, filterGames);
  };

  return (
    <div>
      {genres &&
        genres.map((g) => (
          <button
            className={active === g.name && "active-button"}
            onClick={handleClick}
            value={g.name}
            key={`${g.id}_${g.name}`}
          >
            {g.name}
          </button>
        ))}
    </div>
  );
}

export default Genres;
