const express = require("express");
const app = express();

const prisma = new PrismaClient();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

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
