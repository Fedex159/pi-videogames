import React from "react";
import s from "./Filters.module.css";
import Genres from "../Genres/Genres";
import From from "../From/From";
import Order from "../Order/Order";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchState, filterReset } from "../../actions";
import { getGenresFromDB } from "../../utils/utils";

function Filters({ setShowFilters }) {
  const [genres, setGenres] = useState([]);
  const filterActive = useSelector((state) => state.filterActive);
  const searchState = useSelector((state) => state.searchState);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);

  const [menu, setMenu] = useState({
    Genres: false,
    From: false,
    Order: false,
  });
  useEffect(() => {
    (async () => {
      const response = await getGenresFromDB();
      setGenres(() => response);
    })();
    setMenu(() => ({
      Genres: Boolean(filterActive.genres),
      From: Boolean(filterActive.from),
      Order: Boolean(filterActive.order),
    }));
    // eslint-disable-next-line
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.name === "reset") {
      if (
        filterActive.genres ||
        filterActive.from ||
        filterActive.order ||
        searchState === "on"
      ) {
        dispatch(setSearchState("off"));
        dispatch(filterReset());
        setMenu(() => {
          return {
            Genres: false,
            From: false,
            Order: false,
          };
        });
      }
    } else {
      setMenu((prevState) => {
        return {
          ...prevState,
          [e.target.innerHTML]: !prevState[e.target.innerHTML],
        };
      });
    }
  };
  const onClickHide = () => {
    setClick(() => true);
    setTimeout(() => {
      setShowFilters(() => false);
    }, 200);
  };

  return (
    <div className={`${s.container} ${click ? s.filterHide : s.filterShow}`}>
      <div onClick={onClickHide} className={s.btnHide}>
        Hide filters ↩
      </div>
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
      <div>
        <button className={s.reset} onClick={handleClick} name="reset">
          Reset
        </button>
      </div>
    </div>
  );
}

export default Filters;
