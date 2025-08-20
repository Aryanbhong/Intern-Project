import { Router } from "express";
import {
  adminStats,
  addUser,
  addStore,
  listUsers,
  listStores
} from "../controllers/adminController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();


router.get("/stats", authenticate, authorize("ADMIN"), adminStats);
router.post("/users", authenticate, authorize("ADMIN"), addUser);
router.post("/stores", authenticate, authorize("ADMIN"), addStore);
router.get("/users", authenticate, authorize("ADMIN"), listUsers);
router.get("/stores", authenticate, authorize("ADMIN"), listStores);

export default router;
