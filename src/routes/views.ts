// Packages
import { Router } from "express";

// Controllers
import { getViewsProducts } from "../controllers/views";

const router = Router();

router.get("/", getViewsProducts);

export default router;
