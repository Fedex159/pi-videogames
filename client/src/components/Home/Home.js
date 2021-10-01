import React from "react";
import NavBar from "../NavBar/NavBar";
import Games from "../Games/Games";
import Filters from "../Filters/Filters";
import Footer from "../Footer/Footer";
import s from "./Home.module.css";

function Home() {
  return (
    <div className={s.container}>
      <div className={s.navbar}>
        <NavBar />
      </div>
      <div className={s.filters}>
        <Filters />
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
