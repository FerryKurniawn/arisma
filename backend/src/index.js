const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.json()); // <--- cukup sekali di sini

// Pastikan uploads folder ada
const uploadFolder = "uploads/";
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Start server
app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server running on port: ${PORT}`);
  }
});

// Routes
app.get("/api", (req, res) => {
  res.send("Welcome to my api boskuh");
});

app.get("/api/user", async (req, res) => {
  const user = await prisma.user.findMany();
  res.send(user);
});

app.post("/api/register", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: role.toUpperCase(),
      },
    });

    res.status(201).json({
      message: "User berhasil terdaftar",
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({
      message: "Terjadi kesalahan server",
      error: err.message,
    });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Username tidak ditemukan" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "SECRET_KEY_DEFAULT",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login berhasil",
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// Surat Masuk
app.get("/api/surat-masuk", async (req, res) => {
  try {
    const suratMasuk = await prisma.suratMasuk.findMany({
      orderBy: {
        updatedAt: "desc", // ⬅️ Urutkan by updatedAt terbaru
      },
    });
    res.send(suratMasuk);
  } catch (error) {
    console.error("Error fetching surat masuk:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/surat-masuk/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const surat = await prisma.suratMasuk.findUnique({
      where: { id: parseInt(id) },
    });

    if (!surat) {
      return res.status(404).json({ message: "Surat tidak ditemukan" });
    }

    res.json(surat);
  } catch (err) {
    console.error("❌ ERROR SAAT CREATE SuratMasuk:", err); // Tampilkan error lengkap
    res.status(500).json({
      message: "Terjadi kesalahan saat menambahkan Surat Masuk",
      error: err.message,
    });
  }
});

app.post("/api/surat-masuk", upload.single("fileUrl"), async (req, res) => {
  const {
    noSurat,
    perihal,
    alamatPengirim,
    tanggalTerima,
    sifatSurat,
    disposisi,
    isiDisposisi,
  } = req.body;

  console.log("REQ.BODY:", req.body);
  console.log("REQ.FILE:", req.file);

  try {
    const suratMasuk = await prisma.suratMasuk.create({
      data: {
        noSurat,
        perihal,
        alamatPengirim,
        tanggalTerima,
        sifatSurat,
        fileUrl: req.file ? `/uploads/${req.file.filename}` : null,
        disposisi,
        isiDisposisi,
      },
    });
    res.send("Surat masuk telah berhasil ditambahkan");
  } catch (err) {
    console.error("❌ ERROR SAAT CREATE SuratMasuk:", err); // Tambah log ini
    res.status(500).json({
      message: "Terjadi kesalahan server",
      error: err.message,
    });
  }
});

app.put("/api/surat-masuk/:id", upload.single("fileUrl"), async (req, res) => {
  const { id } = req.params;
  const {
    noSurat,
    perihal,
    alamatPengirim,
    tanggalTerima,
    sifatSurat,
    disposisi,
    isiDisposisi,
  } = req.body;

  try {
    const existingSurat = await prisma.suratMasuk.findUnique({
      where: { id: Number(id) },
    });

    if (!existingSurat) {
      return res.status(404).json({ message: "Surat Masuk tidak ditemukan" });
    }

    const updatedSurat = await prisma.suratMasuk.update({
      where: { id: Number(id) },
      data: {
        noSurat,
        perihal,
        alamatPengirim,
        tanggalTerima,
        sifatSurat,
        fileUrl: req.file
          ? `/uploads/${req.file.filename}`
          : existingSurat.fileUrl,
        disposisi,
        isiDisposisi,
      },
    });

    res.status(200).json({
      message: "Surat Masuk berhasil diperbarui",
      data: updatedSurat,
    });
  } catch (error) {
    console.error("Error updating Surat Masuk:", error);
    res.status(500).json({
      message: "Terjadi kesalahan server",
      error: error.message,
    });
  }
});

app.delete("/api/surat-masuk/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Cek dulu apakah suratnya ada
    const surat = await prisma.suratMasuk.findUnique({
      where: { id: Number(id) },
    });

    if (!surat) {
      return res.status(404).json({ message: "Surat Masuk tidak ditemukan" });
    }

    // Kalau ada, hapus
    await prisma.suratMasuk.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Surat Masuk berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting Surat Masuk:", error);
    res.status(500).json({
      message: "Terjadi kesalahan server saat menghapus Surat Masuk",
      error: error.message,
    });
  }
});
// surat keluar admin tu
app.get("/api/surat-keluar", async (req, res) => {
  try {
    const suratKeluar = await prisma.suratKeluar.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(suratKeluar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data surat keluar." });
  }
});
app.post("/api/surat-keluar", async (req, res) => {
  const {
    noSurat,
    noBerkas,
    alamatPenerima,
    tanggalKeluar,
    perihal,
    noPetunjuk,
    noPaket,
  } = req.body;

  try {
    const newSurat = await prisma.suratKeluar.create({
      data: {
        noSurat,
        noBerkas,
        alamatPenerima,
        tanggalKeluar,
        perihal,
        noPetunjuk,
        noPaket,
      },
    });
    res.status(201).json(newSurat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menambahkan surat keluar." });
  }
});
app.put("/api/surat-keluar/:id", async (req, res) => {
  const { id } = req.params;
  const {
    noSurat,
    noBerkas,
    alamatPenerima,
    tanggalKeluar,
    perihal,
    noPetunjuk,
    noPaket,
  } = req.body;

  try {
    const updated = await prisma.suratKeluar.update({
      where: { id: parseInt(id) },
      data: {
        noSurat,
        noBerkas,
        alamatPenerima,
        tanggalKeluar,
        perihal,
        noPetunjuk,
        noPaket,
      },
    });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengupdate surat keluar." });
  }
});

app.delete("/api/surat-keluar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.suratKeluar.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Surat keluar berhasil dihapus." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menghapus surat keluar." });
  }
});

// kepsek

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
