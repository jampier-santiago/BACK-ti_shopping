"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const express_1 = require("express");
const express_validator_1 = require("express-validator");
// Controller
const store_1 = require("../controllers/store");
// Middlewares
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get("/", store_1.getStores);
router.get("/:id", store_1.getStoreById);
router.post("/new-store", [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)("name", "El nombre es obligatorio").notEmpty(),
    (0, express_validator_1.check)("phoneNumber", "El numero de telefono no es valido")
        .notEmpty()
        .isLength({ min: 6, max: 10 }),
    (0, express_validator_1.check)("email", "El correo no es valido").notEmpty().isEmail(),
    (0, express_validator_1.check)("description", "La descripcion es obligatoria").notEmpty(),
    (0, express_validator_1.check)("keyWords", "Las palabras claves son obligatorias").notEmpty(),
    (0, express_validator_1.check)("accountBank", "El numero de cuenta es obligatorio").notEmpty(),
    middlewares_1.validarCampos,
], store_1.postStore);
router.put("/:id", [middlewares_1.validarJWT, middlewares_1.validarCampos], store_1.putStore);
router.delete("/delete/:id", [middlewares_1.validarJWT, middlewares_1.validarCampos], store_1.deleteStore);
exports.default = router;
//# sourceMappingURL=store.js.map