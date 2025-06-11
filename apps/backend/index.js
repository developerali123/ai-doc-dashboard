require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const authRoutes = require("./routes/auth");
const documentRoutes = require("./routes/document")

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

app.get("/", (req, res) => {
  res.send("AI Document Management Backend Running ✅");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
