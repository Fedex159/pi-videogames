require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("./db");
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
    if (name) {
      return await Videogame.findAll({
        attributes: attributes,
        where: {
          name: name,
        },
        limit: limit,
      });
    } else {
      return await Videogame.findAll({
        attributes: attributes,
        limit: limit,
      });
    }
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
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      })
      .map((game) => {
        return {
          id: game.id,
          name: game.name,
          image: game.isFromDB ? game.image : game.background_image,
          isFromDB: game.isFromDB,
        };
      });
  } catch (e) {
    console.log("Error gamesWithQuery", e);
  }
}

async function gameFromDB(id) {
  try {
    const game = await Videogame.findByPk(id);
    if (game) {
      return {
        id: game.id,
        name: game.name,
        image: game.image,
        isFromDB: true,
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

async function loadGame(info) {
  if (info) {
    try {
      const game = await Videogame.create({
        name: info.name,
        description: info.description,
        image: info.image,
        released: info.released,
        rating: info.rating,
        platforms: info.platforms,
      });
      await game.addGenres(info.genres);
      return true;
    } catch (e) {
      console.log("Error loadGame", e);
    }
  }
  return false;
}

module.exports = {
  gamesFromAPI,
  gamesFromDB,
  gamesWithQuery,
  gameFromDB,
  gameFromAPI,
  loadGenres,
  loadGame,
};
