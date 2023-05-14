// Packages
import { Router } from "express";
import { check } from "express-validator";

// Controllers
import { getAllSales, makeSale } from "../controllers/sales";

// Middlewares
import { validarCampos, validarJWT } from "../middlewares";

const router = Router();

router.get("/:idStore", [validarJWT, validarCampos], getAllSales);

router.post(
  "/",
  [
    validarJWT,
    check("idStore", "Este campo es obligtorio").notEmpty(),
    check("idPorduct", "Este campo es obligatorio").notEmpty(),
    validarCampos,
  ],
  makeSale
);

export default router;
