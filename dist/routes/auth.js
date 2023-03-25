"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const express_1 = require("express");
const express_validator_1 = require("express-validator");
// Controllers
const auth_1 = require("../controllers/auth");
// Middlejares
const validarCampos_1 = require("../middlewares/validarCampos");
const router = (0, express_1.Router)();
router.get("/login", [
    (0, express_validator_1.check)("email", "El email es obligatorio").notEmpty(),
    (0, express_validator_1.check)("email", "No es un correo valido").isEmail(),
    (0, express_validator_1.check)("password", "No es un password valido")
        .notEmpty()
        .isLength({ min: 2, max: 8 }),
    validarCampos_1.validarCampos,
], auth_1.login);
router.post("/new-user", [
    (0, express_validator_1.check)("firstName", "El nombre es obligatorio").notEmpty(),
    (0, express_validator_1.check)("surname", "El apellido es obligatorio").notEmpty(),
    (0, express_validator_1.check)("phoneNumber", "El numero de telefono es obligatorio")
        .notEmpty()
        .isLength({ min: 5, max: 10 }),
    (0, express_validator_1.check)("email", "El correo no es valido").notEmpty().isEmail(),
    (0, express_validator_1.check)("address", "La direcció no es valida").notEmpty(),
    (0, express_validator_1.check)("birthDate", "la fecha de nacimineto no es valida").notEmpty(),
    (0, express_validator_1.check)("password", "No es un password valido")
        .notEmpty()
        .isLength({ min: 2, max: 8 }),
    (0, express_validator_1.check)("role", "El role no es valido, y debe ser de tipo 'ADMIN_ROLE', 'CLIENT_ROLE', 'SELLER_ROLE'")
        .notEmpty()
        .isIn(["ADMIN_ROLE", "CLIENT_ROLE", "SELLER_ROLE"]),
    validarCampos_1.validarCampos,
], auth_1.newUser);
exports.default = router;
//# sourceMappingURL=auth.js.map