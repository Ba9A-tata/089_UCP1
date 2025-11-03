const express = require('express');
const app = express();
const PORT = 3000;
const db = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.sequelize.sync()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => console.log(err));

app.post("/mahasiswa", async (req, res) => {
  try {
    const data = await db.Mahasiswa.create(req.body);
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/mahasiswa", async (req, res) => {
  try {
    const mahasiswa = await db.Mahasiswa.findAll();
    res.send(mahasiswa);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/mahasiswa/:nim", async (req, res) => {
  const nim = req.params.nim;
  try {
    const mahasiswa = await db.Mahasiswa.findByPk(nim);
    if (!mahasiswa) return res.status(404).send({ message: "Siswa tidak ditemukan" });
    await mahasiswa.update(req.body);
    res.send({ message: "Siswa berhasil diupdate", mahasiswa });
  } catch (err) {
    res.status(500).send(err);
  }
});
app.delete("/mahasiswa/:nim", async (req, res) => {
  const nim = req.params.nim;
  try {
    const mahasiswa = await db.Mahasiswa.findByPk(nim);
    if (!mahasiswa) return res.status(404).send({ message: "Siswa tidak ditemukan" });
    await mahasiswa.destroy();
    res.send({ message: "Siswa berhasil dihapus" });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
