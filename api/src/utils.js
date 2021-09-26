require("dotenv").config();
const moment = require("moment");
const { API_KEY } = process.env;
const { Videogame, Genre, Platform } = require("./db");
const axios = require("axios");

async function gamesFromAPI(total, pageSize) {
  try {
    let promises = [];
    let results = [];
    // Armo un arreglo de promesas, para poder obtener 100 resultados
    // ya que de una sola peticion no puedo.
    for (let i = 1, flag = true; total > 0 && flag; i++) {
      if (total - pageSize >= 0) {
        total -= pageSize;
      } else {
        pageSize = total;
        flag = false;
      }
      promises.push(
        axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${pageSize}&page=${i}`
        )
      );
    }

    await Promise.all(promises)
      .then((values) => {
        values.forEach((response) => {
          response.data.results.forEach((game) => {
            results.push({
              id: game.id,
              name: game.name,
              image: game.background_image,
              genres: game.genres.map((genre) => {
                return {
                  id: genre.id,
                  name: genre.name,
                };
              }),
            });
          });
        });
      })
      .catch((e) => console.log(e));
    return results;
  } catch (e) {
    console.log("Error gamesFromAPI", e);
  }
}

async function gamesFromDB(name, attributes, limit = 100) {
  try {
    return await Videogame.findAll({
      attributes: attributes,
      where: name && {
        name: name,
      },
      limit: limit,
      include: {
        model: Genre,
        through: {
          attributes: [],
        },
      },
    });
  } catch (e) {
    console.log("Error gamesFromDB", e);
  }
}

async function gamesWithQuery(name, attributes) {
  try {
    // Me traigo los 15 juegos de la api que coincidan con el name pasado,
    // y 15 juegos de la db que coincidan con el name.
    // Uno los resultados (30), y devuelvo los primeros 15 ordenados.
    const gamesDB = await gamesFromDB(name, attributes, 15);
    const gamesAPI = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=15&search=${name}`
    );
    let results = gamesDB.concat(gamesAPI.data.results);
    return results
      .sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        return 0;
      })
      .map((game) => {
        return {
          id: game.id,
          name: game.name,
          image: game.id.toString().includes("-")
            ? game.image
            : game.background_image,
          genres: game.genres.map((genre) => {
            return {
              id: genre.id,
              name: genre.name,
            };
          }),
        };
      });
  } catch (e) {
    console.log("Error gamesWithQuery", e);
  }
}

async function gameFromDB(id) {
  try {
    const game = await Videogame.findOne({
      include: [
        {
          model: Platform,
          through: {
            attributes: [],
          },
        },
        {
          model: Genre,
          through: {
            attributes: [],
          },
        },
      ],
      where: {
        id: id,
      },
    });
    if (game) {
      return {
        id: game.id,
        name: game.name,
        image: game.image,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms,
        genres: game.genres,
      };
    } else {
      return {};
    }
  } catch (e) {
    console.log("Error gameFromDB", e);
  }
}

async function gameFromAPI(id) {
  try {
    const game = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}&`
    );
    if (game.data) {
      return {
        id: game.data.id,
        name: game.data.name,
        image: game.data.background_image,
        released: game.data.released,
        rating: game.data.rating,
        platforms: game.data.platforms.map((p) => {
          return {
            id: p.platform.id,
            name: p.platform.name,
          };
        }),
        genres: game.data.genres.map((genre) => {
          return {
            id: genre.id,
            name: genre.name,
          };
        }),
      };
    } else {
      return {};
    }
  } catch (e) {
    console.log("Error gameFromAPI", e);
  }
}

async function loadGenres() {
  try {
    const genres = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}&`
    );
    if (genres.data) {
      let promises = [];
      genres.data.results.forEach((genre) => {
        promises.push(
          Genre.create({
            id: genre.id,
            name: genre.name,
          })
        );
      });
      await Promise.all(promises);
    }
  } catch (e) {
    console.log("Error genresFromAPI", e);
  }
}

async function loadPlatforms() {
  try {
    const platforms = await axios.get(
      `https://api.rawg.io/api/platforms?key=${API_KEY}`
    );
    if (platforms.data) {
      let promises = [];
      platforms.data.results.forEach((p) => {
        promises.push(
          Platform.create({
            id: p.id,
            name: p.name,
          })
        );
      });
      await Promise.all(promises);
    }
  } catch (e) {
    console.log("Error loadPlatforms", e);
  }
}

async function loadGame(info) {
  if (info) {
    try {
      const game = await Videogame.create({
        name: info.name,
        description: info.description,
        image: info.image ? info.image : null,
        released: info.released,
        rating: info.rating ? Number(info.rating) : null,
      });
      await game.addGenres(info.genres);
      await game.addPlatforms(info.platforms);
      return true;
    } catch (e) {
      console.log("Error loadGame", e);
    }
  }
  return false;
}

async function validateGenres(genres) {
  try {
    if (!Array.isArray(genres)) return false;
    if (!genres.length) return false;
    const genresDB = await Genre.findAll({
      where: { id: genres },
    });
    return genresDB.length === genres.length;
  } catch (e) {
    console.log("Error validateGenres", e);
  }
}

async function validatePlatforms(platforms) {
  try {
    if (!Array.isArray(platforms)) return false;
    if (!platforms.length) return false;
    const platformDB = await Platform.findAll({
      where: { id: platforms },
    });
    return platformDB.length === platforms.length;
  } catch (e) {
    console.log("Error validatePlatforms", e);
  }
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
    moment(str, "MM/DD/YYYY", true).isValid() ||
    moment(str, "DD/MM/YYYY", true).isValid()
  );
}

async function validateParams(params) {
  try {
    if (!params) return false;
    const { name, description, genres, platforms, image, released, rating } =
      params;
    if (
      typeof name === "string" &&
      name.length > 0 &&
      typeof description === "string" &&
      description.length > 0 &&
      (await validateGenres(genres)) &&
      (await validatePlatforms(platforms)) &&
      (!image || validateUrl(image)) &&
      (!released || validateDate(released)) &&
      !isNaN(Number(rating))
    )
      return true;
    else return false;
  } catch (e) {
    console.log("Error validateParams", e);
  }
}

function validateUUID(id) {
  if (typeof id !== "string") return false;
  const REGEX = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g;
  return REGEX.test(id);
}

module.exports = {
  gamesFromAPI,
  gamesFromDB,
  gamesWithQuery,
  gameFromDB,
  gameFromAPI,
  loadGenres,
  loadGame,
  loadPlatforms,
  validateParams,
  validateUUID,
};
