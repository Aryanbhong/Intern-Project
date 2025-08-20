import { Router } from "express";
import { ownerStats, ownerRatings } from "../controllers/ownerController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();


router.get("/stats", authenticate, authorize("OWNER"), ownerStats);
router.get("/ratings", authenticate, authorize("OWNER"), ownerRatings);

export default router;
