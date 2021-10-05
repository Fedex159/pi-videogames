import axios from "axios";
import moment from "moment";

function validateUUID(id) {
  if (typeof id !== "string") return false;
  const REGEX = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g;
  return REGEX.test(id);
}

function validateUrl(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

function validateDate(str) {
  if (typeof str !== "string") return false;
  return (
    moment(str, "YYYY-MM-DD", true).isValid() ||
    moment(str, "YYYY-DD-MM", true).isValid()
  );
}

export function validatePage(page, length, action, search) {
  if (action === "prev" && search === "off") {
    if (page > 0) return true;
    return false;
  } else if (action === "next" && search === "off") {
    if (page >= 0 && page * 15 + 15 < length) return true;
    return false;
  }
  return false;
}

export function orderStr(a, b) {
  if (a.toLowerCase() > b.toLowerCase()) {
    return 1;
  }
  if (a.toLowerCase() < b.toLowerCase()) {
    return -1;
  }
  return 0;
}

export function filterG(games, type) {
  switch (type) {
    case "A-Z":
      return [...games].sort((a, b) => {
        return orderStr(a.name, b.name);
      });
    case "Z-A":
      return [...games].sort((a, b) => {
        return orderStr(b.name, a.name);
      });
    case "Rating":
      return [...games].sort((a, b) => {
        return orderStr(
          Number(b.rating).toString(),
          Number(a.rating).toString()
        );
      });
    case "DB":
    case "API":
      return games.filter((game) =>
        type === "DB" ? validateUUID(game.id) : !validateUUID(game.id)
      );
    default:
      return games.filter(
        (game) => game.genres.findIndex((genre) => genre.name === type) >= 0
      );
  }
}

export function handleClickFilters(
  event,
  dispatch,
  filter,
  filterGames,
  setFilterActive
) {
  if (event.target.name === "order") {
    if (filter.order !== event.target.value) {
      console.log(event.target.value);
      dispatch(filterGames(event.target.value));
      dispatch(setFilterActive({ ...filter, order: event.target.value }));
    }
  } else {
    if (!filter[event.target.name]) {
      console.log(event.target.value);
      dispatch(filterGames(event.target.value));
      dispatch(
        setFilterActive({
          ...filter,
          [event.target.name]: event.target.value,
        })
      );
    }
  }
}

export async function getGameDetails(id) {
  try {
    const response = await axios.get(`http://localhost:3001/videogames/${id}`);
    return response.data;
  } catch (e) {
    console.log("Error getGameDetails", e);
  }
}

export async function getPlatforms() {
  try {
    const response = await axios.get("http://localhost:3001/platforms");
    return [...response.data].sort((a, b) => {
      return orderStr(a.name, b.name);
    });
  } catch (e) {
    console.log("Error getPlatforms", e);
    return [];
  }
}

export async function getGenresFromDB() {
  try {
    const response = await axios.get("http://localhost:3001/genres");
    return [...response.data].sort((a, b) => {
      return orderStr(a.name, b.name);
    });
  } catch (e) {
    console.log("Error getGenresFromDB", e);
    return [];
  }
}

// export function validateInputs(input) {
//   const errors = {};
//   if (!input.name) {
//     errors.name = "Name cannot be empty";
//   } else if (typeof input.name !== "string") {
//     errors.name = "Only valid string type";
//   } else {
//     errors.name = true;
//   }

//   if (!input.description) {
//     errors.description = "Description cannot be empty";
//   } else if (typeof input.description !== "string") {
//     errors.description = "Only valid string type";
//   } else if (input.description.length < 10) {
//     errors.description = "It must have a minimum of 10 characters";
//   } else {
//     errors.description = true;
//   }

//   if (typeof input.image !== "string") {
//     errors.image = "Only valid string type";
//   } else if (!validateUrl(input.image) && input.image.length > 0) {
//     errors.image = "Enter a valid url";
//   } else {
//     errors.image = true;
//   }

//   if (typeof input.rating !== "string") {
//     errors.rating = "Only valid string type";
//   } else if (isNaN(Number(input.rating))) {
//     errors.rating = "Has to be a number";
//   } else if (Number(input.rating) < 0 || Number(input.rating) > 5) {
//     errors.rating = "It has to be between 0 and 5";
//   } else {
//     errors.rating = true;
//   }

//   if (typeof input.released !== "string") {
//     errors.released = "Only valid string type";
//   } else if (!validateDate(input.released) && input.released.length > 0) {
//     errors.released = "Only valid date";
//   } else {
//     errors.released = true;
//   }

//   return errors;
// }

// export function validateGenres(input) {
//   const errors = {};
//   if (!Object.keys(input).length) {
//     errors.genres = "Select at least 1 gender";
//   } else {
//     let keys = [];
//     for (let key in input) {
//       if (input[key]) {
//         keys.push(key);
//       }
//     }
//     if (!keys.length) {
//       errors.genres = "Select at least 1 gender";
//     } else {
//       errors.genres = true;
//     }
//   }
//   return errors;
// }

// export function validatePlatforms(input) {
//   const errors = {};
//   if (!Object.keys(input).length) {
//     errors.platforms = "Select at least 1 platform";
//   } else {
//     let keys = [];
//     for (let key in input) {
//       if (input[key]) {
//         keys.push(key);
//       }
//     }
//     if (!keys.length) {
//       errors.platforms = "Select at least 1 platform";
//     } else {
//       errors.platforms = true;
//     }
//   }
//   return errors;
// }

// export function validateAll(errorsI, errorsG, errorsP) {
//   let count = 0;
//   for (let key in errorsI) {
//     if (errorsI[key] === true) {
//       count++;
//     }
//   }
//   return count === 5 && errorsG.genres === true && errorsP.platforms === true;
// }

export async function genresToId(inputGenres) {
  const ids = [];
  const genres = await getGenresFromDB();
  inputGenres.forEach((elem) => {
    let index = genres.findIndex((g) => g.name === elem);
    ids.push(genres[index].id);
  });

  return ids;
}

export function validateInputs(input, inputG, inputP) {
  const errors = {};
  if (!input.name) {
    errors.name = "Name cannot be empty";
  }

  if (!input.description) {
    errors.description = "Description cannot be empty";
  } else if (input.description.length < 10) {
    errors.description = "It must have a minimum of 10 characters";
  }

  if (input.image && !validateUrl(input.image) && input.image.length > 0) {
    errors.image = "Enter a valid url";
  }

  if (isNaN(Number(input.rating))) {
    errors.rating = "Has to be a number";
  } else if (Number(input.rating) < 0 || Number(input.rating) > 5) {
    errors.rating = "It has to be between 0 and 5";
  }

  if (
    input.released &&
    !validateDate(input.released) &&
    input.released.length > 0
  ) {
    errors.released = "Only valid date";
  }
  if (!inputG.length) {
    errors.genres = "Select at least 1 gender";
  }
  if (!inputP.length) {
    errors.platform = "Select at least 1 platform";
  }
  return !Object.keys(errors).length ? { validate: true } : errors;
}

export async function addVideogame(body) {
  if (Object.keys(body).length) {
    try {
      const response = await axios.post(
        "http://localhost:3001/videogames",
        body
      );
      return response.data;
    } catch (e) {
      console.log("Error addVideogame", e);
      return {};
    }
  }
}
