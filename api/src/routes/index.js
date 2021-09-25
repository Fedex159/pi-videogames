const { Router } = require("express");
const videogames = require("./videogame");
const genres = require("./genres");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogames);
router.use("/genres", genres);

module.exports = router;
