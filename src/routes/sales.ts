// Packages
import { Router } from "express";
import { check } from "express-validator";

// Controllers
import { getAllSales, makeSale } from "../controllers/sales";

// Middlewares
import { validarCampos, validarJWT, validarCamposVenta } from "../middlewares";

const router = Router();

router.get("/:idStore", [validarJWT, validarCampos], getAllSales);

router.post(
  "/",
  [
    validarJWT,
    check("products", "Este campo es obligtorio").notEmpty(),
    check("idStore", "Este campo es obligatorio").notEmpty(),
    validarCamposVenta,
    validarCampos,
  ],
  makeSale
);

export default router;
