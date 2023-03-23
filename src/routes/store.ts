// Packages
import { Router } from "express";

// Controller
import { getStores, getStoreById } from "../controllers/store";

const router = Router();

router.get("/", getStores);

router.get("/:id", getStoreById);

export default router;
