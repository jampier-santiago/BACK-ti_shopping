"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const express_1 = require("express");
const express_validator_1 = require("express-validator");
// Controllers
const sales_1 = require("../controllers/sales");
// Middlewares
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get("/:idStore", [middlewares_1.validarJWT, middlewares_1.validarCampos], sales_1.getAllSales);
router.post("/", [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)("idStore", "Este campo es obligtorio").notEmpty(),
    (0, express_validator_1.check)("idPorduct", "Este campo es obligatorio").notEmpty(),
    middlewares_1.validarCampos,
], sales_1.makeSale);
exports.default = router;
//# sourceMappingURL=sales.js.map