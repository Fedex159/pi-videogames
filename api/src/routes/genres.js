var express = require("express");
var router = express.Router();
const { loadGenres } = require("../utils");
const { Genre } = require("../db");
let genresLoad = false;

router.get("/", async (req, res) => {
  try {
    if (!genresLoad) {
      console.log("Genres load in DB");
      await loadGenres();
      genresLoad = true;
    }
    const genres = await Genre.findAll();
    res.json(genres);
  } catch (e) {
    res.sendStatus(404);
  }
});
module.exports = router;
