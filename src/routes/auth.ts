// Packages
import { Router } from "express";
import { check } from "express-validator";

// Controllers
import { login, newUser } from "../controllers/auth";

// Middlejares
import { validarCampos } from "../middlewares/validarCampos";

const router = Router();

router.get(
  "/login",
  [
    check("email", "El email es obligatorio").notEmpty(),
    check("email", "No es un correo valido").isEmail(),
    check("password", "No es un password valido")
      .notEmpty()
      .isLength({ min: 2, max: 8 }),
    validarCampos,
  ],
  login
);

router.post(
  "/new-user",
  [
    check("firstName", "El nombre es obligatorio").notEmpty(),
    check("surname", "El apellido es obligatorio").notEmpty(),
    check("phoneNumber", "El numero de telefono es obligatorio")
      .notEmpty()
      .isLength({ min: 5, max: 10 }),
    check("email", "El correo no es valido").notEmpty().isEmail(),
    check("address", "La direcció no es valida").notEmpty(),
    check("birthDate", "la fecha de nacimineto no es valida").notEmpty(),
    check("password", "No es un password valido")
      .notEmpty()
      .isLength({ min: 2, max: 8 }),
    check(
      "role",
      "El role no es valido, y debe ser de tipo 'ADMIN_ROLE', 'CLIENT_ROLE', 'SELLER_ROLE'"
    )
      .notEmpty()
      .isIn(["ADMIN_ROLE", "CLIENT_ROLE", "SELLER_ROLE"]),
    validarCampos,
  ],
  newUser
);

export default router;
