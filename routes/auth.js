"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const express_1 = require("express");
const express_validator_1 = require("express-validator");
// Controllers
const auth_1 = require("../controllers/auth");
// Middlejares
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get("/users", [middlewares_1.validarJWT, middlewares_1.validarCampos], auth_1.getAllUsers);
router.post("/login", [
    (0, express_validator_1.check)("email", "El email es obligatorio").notEmpty(),
    (0, express_validator_1.check)("email", "No es un correo valido").isEmail(),
    (0, express_validator_1.check)("password", "No es un password valido")
        .notEmpty()
        .isLength({ min: 2, max: 8 }),
    middlewares_1.validarCampos,
], auth_1.login);
router.post("/new-user", [
    (0, express_validator_1.check)("firstName", "El nombre es obligatorio").notEmpty(),
    (0, express_validator_1.check)("surname", "El apellido es obligatorio").notEmpty(),
    (0, express_validator_1.check)("phoneNumber", "El numero de telefono es obligatorio")
        .notEmpty()
        .isLength({ min: 5, max: 10 }),
    (0, express_validator_1.check)("email", "El correo no es valido").notEmpty().isEmail(),
    (0, express_validator_1.check)("birthDate", "la fecha de nacimineto no es valida").notEmpty(),
    (0, express_validator_1.check)("password", "No es un password valido")
        .notEmpty()
        .isLength({ min: 2, max: 8 }),
    (0, express_validator_1.check)("address", "La direccion es obligatoria").notEmpty(),
    middlewares_1.validarCampos,
], auth_1.newUser);
router.delete("/delete/:id", [middlewares_1.validarJWT, middlewares_1.validarCampos], auth_1.deleteUser);
router.put("/update/:id", [middlewares_1.validarJWT, middlewares_1.validarCampos], auth_1.updateUser);
router.put("/active/:id", [middlewares_1.validarJWT, middlewares_1.validarCampos], auth_1.activeUser);
exports.default = router;
//# sourceMappingURL=auth.js.map