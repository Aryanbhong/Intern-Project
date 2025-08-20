import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// Import routes
import authRoutes from "./routes/auth.js";
import storeRoutes from "./routes/stores.js";
import ratingRoutes from "./routes/ratings.js";
import userRoutes from "./routes/users.js";
import ownerRoutes from "./routes/owner.js";

dotenv.config();


const prisma = new PrismaClient();


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/owner", ownerRoutes);


app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Something went wrong!" });
});


process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
