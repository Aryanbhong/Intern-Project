import { Router } from "express";
import { listStores, submitRating } from "../controllers/userController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();


router.get("/stores", authenticate, authorize("USER"), listStores);
router.post("/ratings", authenticate, authorize("USER"), submitRating);

export default router;
