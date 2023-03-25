// Packages
import { Router } from "express";
import { check } from "express-validator";

// Controller
import { getStores, getStoreById, postStore } from "../controllers/store";
import { validarCampos, validarJWT } from "../middlewares";

const router = Router();

router.get("/", getStores);

router.get("/:id", getStoreById);

router.post(
  "/new-store",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").notEmpty(),
    check("phoneNumber", "El numero de telefono no es valido")
      .notEmpty()
      .isLength({ min: 6, max: 10 }),
    check("email", "El correo no es valido").notEmpty().isEmail(),
    check("description", "La descripcion es obligatoria").notEmpty(),
    check("keyWords", "Las palabras claves son obligatorias").notEmpty(),
    check("accountBank", "El numero de cuenta es obligatorio").notEmpty(),
    validarCampos,
  ],
  postStore
);

export default router;
