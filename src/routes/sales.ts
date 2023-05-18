// Packages
import { Router } from "express";
import { check } from "express-validator";

// Controllers
import { getAllSales, makeSale, getDataForGraph } from "../controllers/sales";

// Middlewares
import { validarCampos, validarJWT } from "../middlewares";

const router = Router();

router.get("/:idStore", [validarJWT, validarCampos], getAllSales);

router.get("/graph/:idStore", [validarJWT, getDataForGraph]);

router.post(
  "/",
  [
    validarJWT,
    check("idStore", "Este campo es obligtorio").notEmpty(),
    check("products", "Este campo es obligatorio").notEmpty(),
    validarCampos,
  ],
  makeSale
);

export default router;
