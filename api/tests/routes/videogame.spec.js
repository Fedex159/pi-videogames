/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
  description:
    "Mario Bros. es un videojuego de arcade desarrollado por Nintendo en el año 1983. Fue creado por Shigeru Miyamoto. Ha sido presentado como un minijuego en la serie de Super Mario Advance y otros juegos.",
  image: null,
  released: "1983-14-07",
  rating: 5,
  genres: [11, 83],
  platforms: "NES&&Game Boy&&Nintendo 64",
};

describe("Videogame routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Videogame.sync({ force: true }).then(() => Videogame.create(videogame))
  );
  describe("GET /videogames", () => {
    it("should get 200", (done) => {
      agent.get("/videogames").expect(200);
      done();
    });
  });
});
