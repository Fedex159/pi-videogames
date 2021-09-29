import React from "react";
import { filterGames } from "../../actions";
import { useDispatch } from "react-redux";

function Genres({ genres }) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(filterGames(e.target.value));
  };
  return (
    <div>
      {genres &&
        genres.map((g) => (
          <button
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
