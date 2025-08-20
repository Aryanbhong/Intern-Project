import { Router } from "express";
import {
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore
} from "../controllers/storeController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();


router.get("/", getAllStores);
router.get("/:id", getStoreById);

router.put("/:id", authenticate, authorize("OWNER", "ADMIN"), updateStore);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteStore);

export default router;
