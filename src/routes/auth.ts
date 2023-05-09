// Packages
import { Router } from "express";
import { check } from "express-validator";

// Controllers
import {
  login,
  newUser,
  deleteUser,
  updateUser,
  getAllUsers,
  activeUser,
} from "../controllers/auth";

// Middlejares
import { validarJWT, validarCampos } from "../middlewares";

const router = Router();

router.get("/users", [validarJWT, validarCampos], getAllUsers);

router.post(
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
    check("birthDate", "la fecha de nacimineto no es valida").notEmpty(),
    check("password", "No es un password valido")
      .notEmpty()
      .isLength({ min: 2, max: 8 }),
    check("address", "La direccion es obligatoria").notEmpty(),
    validarCampos,
  ],
  newUser
);

router.delete("/delete/:id", [validarJWT, validarCampos], deleteUser);

router.put("/update/:id", [validarJWT, validarCampos], updateUser);

router.put("/active/:id", [validarJWT, validarCampos], activeUser);

export default router;
