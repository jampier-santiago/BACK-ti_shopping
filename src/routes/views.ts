// Packages
import { Router } from "express";

// Controllers
import { getViewsCategories } from "../controllers/views";

const router = Router();

router.get("/", getViewsCategories);

export default router;
