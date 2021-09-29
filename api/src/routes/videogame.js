var express = require("express");
var router = express.Router();
const {
  gamesFromAPI,
  gamesFromDB,
  gamesWithQuery,
  gameFromDB,
  gameFromAPI,
} = require("../utils/utils_games");
const { loadGame } = require("../utils/utils_loads");
const { validateParams, validateUUID } = require("../utils/utils_validate");

// const TOTAL = 100;
// const PAGE_SIZE = 20;
const ATTRIBUTES = ["id", "name", "image", "rating"];

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      // const gamesAPI = await gamesFromAPI(TOTAL, PAGE_SIZE);
      const gamesDB = await gamesFromDB(name, ATTRIBUTES);
      const gamesAPI = await gamesFromAPI();
      res.json(gamesDB.concat(gamesAPI));
    } else {
      res.json(await gamesWithQuery(name, ATTRIBUTES));
    }
  } catch (e) {
    res.sendStatus(404);
  }
});

router.get("/:idVideogame", async (req, res) => {
  const { idVideogame } = req.params;
  try {
    if (validateUUID(idVideogame)) {
      res.json(await gameFromDB(idVideogame));
    } else if (!isNaN(Number(idVideogame))) {
      res.json(await gameFromAPI(idVideogame));
    } else {
      res.json({});
    }
  } catch (e) {
    res.sendStatus(404);
  }
});

router.post("/", async (req, res) => {
  try {
    if (await validateParams(req.body)) {
      const game = await loadGame(req.body);
      res.json(game ? { created: true } : { created: false });
    } else {
      res.status(400).json({
        Error:
          "Parameters required or Genres/Platforms/Image/Date/Rating not valid.",
      });
    }
  } catch (e) {
    res.sendStatus(404);
  }
});

module.exports = router;
