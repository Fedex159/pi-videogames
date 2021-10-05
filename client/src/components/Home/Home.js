import React from "react";
import NavBar from "../NavBar/NavBar";
import Games from "../Games/Games";
import Filters from "../Filters/Filters";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import NotGame from "../NotGame/NotGame";
import s from "./Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getGames,
  filterReset,
  gamesPage,
  setLoading,
  resetState,
} from "../../actions";

function Home() {
  const loading = useSelector((state) => state.loading);
  const pages = useSelector((state) => state.gamesPage);
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      dispatch(await getGames());
      dispatch(filterReset());
      dispatch(gamesPage(page));
      dispatch(setLoading(false));
    })();

    return () => {
      // console.log("Saliendo...");
      dispatch(resetState());
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={s.container}>
      <div className={s.navbar}>
        <NavBar />
      </div>
      <div className={s.filters}>{loading ? null : <Filters />}</div>
      <div className={s.games}>
        {loading ? <Loading /> : <Games />}
        {!pages.length && !loading && <NotGame />}
      </div>
      <div className={s.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
