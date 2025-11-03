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

app.put("/buku/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const buku = await db.Buku.findByPk(id);
    if (!buku) return res.status(404).send({ message: "Buku tidak ditemukan" });
    await buku.update(req.body);
    res.send({ message: "Buku berhasil diupdate", buku });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/buku/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const buku = await db.Buku.findByPk(id);
    if (!buku) return res.status(404).send({ message: "Buku tidak ditemukan" });
    await buku.destroy();
    res.send({ message: "Buku berhasil dihapus" });
  } catch (err) {
    res.status(500).send(err);
  }
});





