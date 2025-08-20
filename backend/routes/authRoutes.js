
import express from "express";
import { signup, login, updatePassword } from "../controllers/auth.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);


router.put("/update-password", verifyToken, updatePassword);

export default router;
