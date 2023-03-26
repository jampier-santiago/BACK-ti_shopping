// Packages
import { Router } from "express";
import { check } from "express-validator";

// Controllers
import { getProductById } from "../controllers/products";

// Middlewares
import { validarCampos, validarJWT } from "../middlewares";

const router = Router();

router.get("/:id", getProductById);

export default router;
