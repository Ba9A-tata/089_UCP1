const express = require('express');
const app = express();
const PORT = 3000;
const db = require("./models");
const buku = require('./models/buku');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.sequelize.sync()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => console.log(err));

  app.post("/buku", async (req, res) => {
  try {
    const data = await db.Buku.create(req.body);
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/buku", async (req, res) => {
  try {
    const buku = await db.Buku.findAll();
    res.send(buku);
  } catch (err) {
    res.status(500).send(err);
  }
});

