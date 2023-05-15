"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const express_1 = require("express");
const express_validator_1 = require("express-validator");
// Controllers
const products_1 = require("../controllers/products");
// Middlewares
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get("/:idStore", products_1.getProducts);
router.get("/:id", products_1.getProductById);
router.get("/store/:id", products_1.getProductByStore);
router.post("/new-product", [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)("name", "El nombre del producto es obligatorio").notEmpty(),
    (0, express_validator_1.check)("description", "La descripción del producto es obligatorio").notEmpty(),
    (0, express_validator_1.check)("price", "El precio es obligatorio").notEmpty(),
    (0, express_validator_1.check)("category", "No es un id valido para una categoria").notEmpty(),
    (0, express_validator_1.check)("store", "El id de la tienda a la que pertenece el producto es obligatorio").notEmpty(),
    (0, express_validator_1.check)("brand", "La marca del producto es obligatoria").notEmpty(),
    middlewares_1.validarCampos,
], products_1.makeProduct);
router.put("/update/:id", [middlewares_1.validarJWT, middlewares_1.validarCampos], products_1.updateProduct);
router.delete("/delete/:id", [middlewares_1.validarJWT, middlewares_1.validarCampos], products_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=products.js.map