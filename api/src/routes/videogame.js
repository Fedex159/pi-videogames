var express = require("express");
var router = express.Router();
const {
  gamesFromAPI,
  gamesFromDB,
  gamesWithQuery,
  gameFromDB,
  gameFromAPI,
  loadGame,
} = require("../utils");

const TOTAL = 100;
const PAGE_SIZE = 20;
const ATTRIBUTES = ["id", "name", "image", "isFromDB"];

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
  const { isFromDB } = req.query;
  try {
    if (isFromDB === "true") {
      res.json(await gameFromDB(idVideogame));
    } else {
      res.json(await gameFromAPI(idVideogame));
    }
  } catch (e) {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  const { name, description } = req.body;
  if (name && description) {
    res.json(loadGame(req.body) ? { created: true } : { created: false });
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
