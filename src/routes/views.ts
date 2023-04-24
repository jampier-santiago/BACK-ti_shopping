// Packages
import { Router } from "express";

// Controllers
import { getViews } from "../controllers/views";

const router = Router();

router.get("/", getViews);

export default router;
