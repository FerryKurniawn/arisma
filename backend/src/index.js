const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server running on port: ${PORT}`);
  }
});

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
        role: role.toUpperCase(), // "ADMIN", "KEPSEK"
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
    if (!user)
      return res.status(400).json({ message: "Username tidak ditemukan" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Password salah" });

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
