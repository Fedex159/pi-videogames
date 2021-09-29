import React from "react";
import s from "./Filters.module.css";
import Genres from "../Genres/Genres";
import From from "../From/From";
import Order from "../Order/Order";
import { getGenres } from "../../actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Filters() {
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  const [menu, setMenu] = useState({
    Genres: false,
    From: false,
    Order: false,
  });
  useEffect(() => {
    (async () => {
      dispatch(await getGenres());
    })();
    // eslint-disable-next-line
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setMenu((prevState) => {
      return {
        ...prevState,
        [e.target.innerHTML]: !prevState[e.target.innerHTML],
      };
    });
  };
  return (
    <div className={s.container}>
      <div className={s.genres}>
        <h3 onClick={handleClick} name="Genres">
          Genres
        </h3>
        <div>{menu.Genres && <Genres genres={genres} />}</div>
      </div>
      <div className={s.from}>
        <h3 onClick={handleClick} name="From">
          From
        </h3>
        <div>{menu.From && <From />}</div>
      </div>
      <div className={s.order}>
        <h3 onClick={handleClick} name="Order">
          Order
        </h3>
        <div>{menu.Order && <Order />}</div>
      </div>
    </div>
  );
}

export default Filters;
