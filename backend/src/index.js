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
app.use(express.json());
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
// rest api users

app.get("/api/users", async (req, res) => {
  const { role } = req.query;

  try {
    const users = await prisma.user.findMany({
      where: role ? { role: role.toUpperCase() } : {}, // filter jika ada query
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    res.json(users);
  } catch (error) {
    console.error("Gagal mengambil user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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

// dashboard
// Jumlah total dan per tahun surat masuk & keluar
app.get("/api/dashboard", async (req, res) => {
  try {
    const suratMasuk = await prisma.suratMasuk.findMany();
    const suratKeluar = await prisma.suratKeluar.findMany();

    const getYear = (dateString) => {
      const date = new Date(dateString);
      return date.getFullYear();
    };

    const countByYear = (data, fieldName) => {
      const counts = {};
      for (const item of data) {
        const year = getYear(item[fieldName]);
        if (!counts[year]) counts[year] = { masuk: 0, keluar: 0, disposisi: 0 };
        if (fieldName === "tanggalTerima") {
          counts[year].masuk++;
          if (item.disposisi) counts[year].disposisi++;
        } else if (fieldName === "tanggalKeluar") {
          counts[year].keluar++;
        }
      }
      return counts;
    };

    const tahunMasuk = countByYear(suratMasuk, "tanggalTerima");
    const tahunKeluar = countByYear(suratKeluar, "tanggalKeluar");

    // Gabungkan
    const allYears = new Set([
      ...Object.keys(tahunMasuk),
      ...Object.keys(tahunKeluar),
    ]);
    const rekap = Array.from(allYears)
      .sort((a, b) => b - a)
      .map((tahun) => ({
        tahun,
        masuk: tahunMasuk[tahun]?.masuk || 0,
        disposisi: tahunMasuk[tahun]?.disposisi || 0,
        keluar: tahunKeluar[tahun]?.keluar || 0,
      }));

    res.json({
      totalMasuk: suratMasuk.length,
      totalKeluar: suratKeluar.length,
      rekap,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
    const parsedTanggal = new Date(tanggalTerima);

    if (isNaN(parsedTanggal)) {
      return res.status(400).json({ message: "Format tanggal tidak valid" });
    }

    const suratMasuk = await prisma.suratMasuk.create({
      data: {
        noSurat,
        perihal,
        alamatPengirim,
        tanggalTerima: parsedTanggal,
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
  const { disposisi, isiDisposisi, disposisikanKe, tenggatWaktu } = req.body;

  try {
    // Pastikan surat dengan ID yang diberikan ada
    const existingSurat = await prisma.suratMasuk.findUnique({
      where: { id: Number(id) },
    });

    if (!existingSurat) {
      return res.status(404).json({ message: "Surat Masuk tidak ditemukan" });
    }

    const parsedTanggal = tenggatWaktu ? new Date(tenggatWaktu) : null;

    // Lakukan update pada data surat
    const updatedSurat = await prisma.suratMasuk.update({
      where: { id: Number(id) },
      data: {
        disposisi,
        isiDisposisi,
        disposisikanKe,
        tenggatWaktu: parsedTanggal,
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
      orderBy: { updatedAt: "desc" },
    });
    res.json(suratKeluar);
  } catch (err) {
    console.error("Ambil surat keluar gagal:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get("/api/surat-keluar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const surat = await prisma.suratKeluar.findUnique({
      where: { id: parseInt(id) },
    });

    if (!surat) {
      return res.status(404).json({ message: "Surat tidak ditemukan" });
    }

    res.json(surat);
  } catch (err) {
    console.error("Ambil detail surat keluar gagal:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.post("/api/surat-keluar", upload.single("fileUrl"), async (req, res) => {
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
    const parsedDate = new Date(tanggalKeluar);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ message: "Format tanggal tidak valid" });
    }

    const surat = await prisma.suratKeluar.create({
      data: {
        noSurat,
        noBerkas,
        alamatPenerima,
        tanggalKeluar: parsedDate,
        perihal,
        noPetunjuk,
        noPaket,
        fileUrl: req.file ? `/uploads/${req.file.filename}` : null,
      },
    });

    res
      .status(201)
      .json({ message: "Surat keluar berhasil ditambahkan", data: surat });
  } catch (err) {
    console.error("Tambah surat keluar gagal:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.put("/api/surat-keluar/:id", upload.single("fileUrl"), async (req, res) => {
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
    const existing = await prisma.suratKeluar.findUnique({
      where: { id: Number(id) },
    });
    if (!existing)
      return res.status(404).json({ message: "Surat tidak ditemukan" });

    const updated = await prisma.suratKeluar.update({
      where: { id: Number(id) },
      data: {
        noSurat,
        noBerkas,
        alamatPenerima,
        tanggalKeluar: new Date(tanggalKeluar),
        perihal,
        noPetunjuk,
        noPaket,
        fileUrl: req.file ? `/uploads/${req.file.filename}` : existing.fileUrl,
      },
    });

    res.json({ message: "Surat keluar berhasil diperbarui", data: updated });
  } catch (error) {
    console.error("Update surat keluar gagal:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
