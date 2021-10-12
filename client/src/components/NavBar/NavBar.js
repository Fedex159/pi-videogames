import React, { useState } from "react";
import Logo from "../../img/logo.png";
import s from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchGame, setLoading } from "../../actions";
import { setFilterActive } from "../../actions";

function NavBar() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState({});

  const validateValue = (value) => {
    let errors = {};
    if (/^\s+/gi.test(value)) {
      errors.value = "Cannot be empty string or start with a space";
    }
    return errors;
  };

  const onChange = (e) => {
    setValue(() => {
      const value = e.target.value;
      setErrors(() => validateValue(value));
      return value;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.search.value;
    if (name && !loading && !errors.value) {
      dispatch(setLoading(true));
      dispatch(await searchGame(name));
      dispatch(setFilterActive({ genres: "", from: "", order: "" }));
      dispatch(setLoading(false));
      e.target.search.value = "";
    }
  };

  return (
    <div className={s.container}>
      <img src={Logo} alt="" />
      <form onSubmit={onSubmit} className={s.search}>
        {loading && <input disabled name="search" placeholder="Search ..." />}
        {!loading && (
          <input
            className={errors.value ? s.error : ""}
            value={value}
            onChange={onChange}
            name="search"
            placeholder="Search ..."
          />
        )}
        <button
          style={
            errors.value
              ? {
                  backgroundColor: "red",
                  borderColor: "red",
                  color: "white",
                  boxShadow: "none",
                  fontWeight: "bold",
                }
              : null
          }
          type="submit"
        >
          🔍
        </button>
        {errors.value ? (
          <div
            style={{
              color: "red",
              textAlign: "start",
              marginTop: "5px",
            }}
          >
            {errors.value}
          </div>
        ) : null}
      </form>
      <Link className={s.link} to="/create">
        <h4>Create</h4>
      </Link>
    </div>
  );
}

export default NavBar;
