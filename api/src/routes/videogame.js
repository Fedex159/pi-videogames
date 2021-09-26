var express = require("express");
var router = express.Router();
const {
  gamesFromAPI,
  gamesFromDB,
  gamesWithQuery,
  gameFromDB,
  gameFromAPI,
  loadGame,
  validateParams,
  validateUUID,
} = require("../utils");

const TOTAL = 100;
const PAGE_SIZE = 20;
const ATTRIBUTES = ["id", "name", "image"];

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const gamesDB = await gamesFromDB(name, ATTRIBUTES);
      const gamesAPI = await gamesFromAPI(TOTAL, PAGE_SIZE);
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
