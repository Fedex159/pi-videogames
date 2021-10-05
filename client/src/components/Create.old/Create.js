import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGenres } from "../../actions";
import {
  getPlatforms,
  validateInputs,
  validateGenres,
  validatePlatforms,
  validateAll,
  genresToId,
} from "../../utils/utils";
import { useState } from "react";
import s from "./Create.module.css";
import { Link } from "react-router-dom";

function Create() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const [platforms, setPlatforms] = useState([]);
  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    rating: "",
    released: "",
  });
  const [inputGenres, setInputGenres] = useState({});
  const [inputPlatforms, setInputPlatforms] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [inputErrorsGenres, setInputErrorsGenres] = useState({});
  const [inputErrorsPlatforms, setInputErrorsPlatforms] = useState({});
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    (async () => {
      dispatch(await getGenres());
      const data = await getPlatforms();
      setPlatforms(() => data);
    })();
    // eslint-disable-next-line
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      ...input,
      platforms: Object.keys(inputPlatforms),
      rating: Number(input.rating),
      genres: genresToId(inputGenres, genres),
    };
    if (validateAll(inputErrors, inputErrorsGenres, inputErrorsPlatforms)) {
      (async () => {
        try {
          const response = await axios.post(
            "http://localhost:3001/videogames",
            body
          );
          const input = {
            name: "",
            description: "",
            image: "",
            rating: "",
            released: "",
          };
          setInput(() => input);
          setInputGenres(() => ({}));
          setInputPlatforms(() => ({}));
          setInputErrors(() => ({}));
          setInputErrorsGenres(() => ({}));
          setInputErrorsPlatforms(() => ({}));
          setSubmit(() => false);
          document
            .querySelectorAll("input[type=checkbox]")
            .forEach((el) => (el.checked = false));
          alert(`Game: ${response.data.created}`);
          // window.location.reload();
        } catch (e) {
          console.log("Error post videogames", e);
        }
      })();
    }
  };

  const onChangeInputs = (e) => {
    setInput((prev) => {
      const input = { ...prev, [e.target.name]: e.target.value };
      setInputErrors(() => {
        const errorsI = validateInputs(input);
        setSubmit(() =>
          validateAll(errorsI, inputErrorsGenres, inputErrorsPlatforms)
        );
        return errorsI;
      });

      return input;
    });
    setInputErrorsGenres(() => validateGenres(inputGenres));
    setInputErrorsPlatforms(() => validatePlatforms(inputPlatforms));
  };

  const onChangeInputGenres = (e) => {
    setInputGenres((prev) => {
      const input = {
        ...prev,
        [e.target.name]: !prev[e.target.name],
      };
      setInputErrorsGenres(() => {
        const errorsG = validateGenres(input);
        setSubmit(() =>
          validateAll(inputErrors, errorsG, inputErrorsPlatforms)
        );
        return errorsG;
      });

      return input;
    });
    setInputErrors(() => validateInputs(input));
    setInputErrorsPlatforms(() => validatePlatforms(inputPlatforms));
  };

  const onChangeInputPlatforms = (e) => {
    setInputPlatforms((prev) => {
      const input = {
        ...prev,
        [e.target.name]: !prev[e.target.name],
      };
      setInputErrorsPlatforms(() => {
        const errorsP = validatePlatforms(input);
        setSubmit(() => validateAll(inputErrors, inputErrorsGenres, errorsP));
        return errorsP;
      });

      return input;
    });
    setInputErrors(() => validateInputs(input));
    setInputErrorsGenres(() => validateGenres(inputGenres));
  };

  return (
    <div className={s.container}>
      <div className={s.btn}>
        <Link className={s.link} to="/home">
          <div>Home</div>
        </Link>
      </div>
      <form onSubmit={onSubmit}>
        <fieldset className={s.info}>
          {inputErrors.name !== undefined && inputErrors.name !== true ? (
            <label className={s.danger}>{inputErrors.name}</label>
          ) : (
            <label>Name</label>
          )}
          <input
            className={
              inputErrors.name !== undefined && inputErrors.name === true
                ? s.valid
                : inputErrors.name === undefined
                ? null
                : s.dangerShadow
            }
            onChange={onChangeInputs}
            value={input.name}
            type="text"
            name="name"
            placeholder="Name"
          />

          {inputErrors.description !== undefined &&
          inputErrors.description !== true ? (
            <label className={s.danger}>{inputErrors.description}</label>
          ) : (
            <label>Description</label>
          )}
          <textarea
            className={
              inputErrors.description !== undefined &&
              inputErrors.description === true
                ? s.valid
                : inputErrors.description === undefined
                ? null
                : s.dangerShadow
            }
            onChange={onChangeInputs}
            value={input.description}
            name="description"
            placeholder="Description"
            rows="5"
          />
          {inputErrors.image !== undefined && inputErrors.image !== true ? (
            <label className={s.danger}>{inputErrors.image}</label>
          ) : (
            <label>Image URL</label>
          )}
          <input
            className={
              inputErrors.image !== undefined && inputErrors.image === true
                ? s.valid
                : inputErrors.image === undefined
                ? null
                : s.dangerShadow
            }
            onChange={onChangeInputs}
            value={input.image}
            type="text"
            name="image"
            placeholder="http://url-image"
          />
        </fieldset>
        <fieldset className={s.numbers}>
          <fieldset className={s.fieldDiv}>
            {inputErrors.rating !== undefined && inputErrors.rating !== true ? (
              <label className={s.danger}>{inputErrors.rating}</label>
            ) : (
              <label>Rating</label>
            )}
            <input
              className={
                inputErrors.rating !== undefined && inputErrors.rating === true
                  ? s.valid
                  : inputErrors.rating === undefined
                  ? null
                  : s.dangerShadow
              }
              onChange={onChangeInputs}
              value={input.rating}
              type="number"
              name="rating"
              placeholder="Rating"
              step="0.01"
              min="0"
              max="5"
            />
          </fieldset>
          <fieldset className={s.fieldDiv}>
            {inputErrors.released !== undefined &&
            inputErrors.released !== true ? (
              <label className={s.danger}>{inputErrors.released}</label>
            ) : (
              <label>Released</label>
            )}
            <input
              className={
                inputErrors.released !== undefined &&
                inputErrors.released === true
                  ? s.valid
                  : inputErrors.released === undefined
                  ? null
                  : s.dangerShadow
              }
              onChange={onChangeInputs}
              value={input.released}
              type="date"
              name="released"
            />
          </fieldset>
        </fieldset>
        {inputErrorsGenres.genres !== undefined &&
        inputErrorsGenres.genres !== true ? (
          <label className={s.danger}>{inputErrorsGenres.genres}</label>
        ) : (
          <label>Genres</label>
        )}
        <fieldset
          className={`${s.genres} ${
            inputErrorsGenres.genres !== undefined &&
            inputErrorsGenres.genres === true
              ? s.valid
              : inputErrorsGenres.genres === undefined
              ? null
              : s.dangerShadowCheckbox
          }`}
        >
          {genres &&
            genres.map((g) => (
              <label key={`${g.id}-${g.name}`}>
                <input
                  onChange={onChangeInputGenres}
                  type="checkbox"
                  name={g.name}
                />
                {g.name}
              </label>
            ))}
        </fieldset>
        {inputErrorsPlatforms.platforms !== undefined &&
        inputErrorsPlatforms.platforms !== true ? (
          <label className={s.danger}>{inputErrorsPlatforms.platforms}</label>
        ) : (
          <label>Platforms</label>
        )}
        <fieldset
          className={`${s.platforms} ${
            inputErrorsPlatforms.platforms !== undefined &&
            inputErrorsPlatforms.platforms === true
              ? s.valid
              : inputErrorsPlatforms.platforms === undefined
              ? null
              : s.dangerShadowCheckbox
          }`}
        >
          {platforms &&
            platforms.map((p, i) => (
              <label key={`${p.name}_${i}`}>
                <input
                  onChange={onChangeInputPlatforms}
                  type="checkbox"
                  name={p.name}
                />
                {p.name}
              </label>
            ))}
        </fieldset>
        {submit && <button type="submit">Create</button>}
      </form>
      <div className={s.footer}></div>
    </div>
  );
}

export default Create;
