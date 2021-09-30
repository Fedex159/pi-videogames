import React from "react";
import NavBar from "../NavBar/NavBar";
import Games from "../Games/Games";
import Filters from "../Filters/Filters";
import Footer from "../Footer/Footer";
import s from "./Home.module.css";
import { useDispatch } from "react-redux";
import { setSearchState, filterReset } from "../../actions";

function Home() {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setSearchState("off"));
    dispatch(filterReset());
  };
  return (
    <div className={s.container}>
      <div className={s.navbar}>
        <NavBar />
      </div>
      <div className={s.filters}>
        <Filters />
        <div className={s.reset}>
          <button onClick={handleClick}>Reset</button>
        </div>
      </div>
      <div className={s.games}>
        <Games />
      </div>
      <div className={s.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
