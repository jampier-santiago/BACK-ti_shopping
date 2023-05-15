"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Pacakages
const express_1 = require("express");
const express_validator_1 = require("express-validator");
// Middlewares
const middlewares_1 = require("../middlewares");
// Controllers
const categories_1 = require("../controllers/categories");
const router = (0, express_1.Router)();
router.get("/", categories_1.getCategories);
router.get("/:id", categories_1.getCategoryById);
router.post("/new-category", [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)("name", "El nombre de la categoria es obligatorio").notEmpty(),
    middlewares_1.validarCampos,
], categories_1.makeNewCategory);
router.put("/update/:id", [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)("name", "El nombre de la categoria es obligatorio").notEmpty(),
    middlewares_1.validarCampos,
], categories_1.updateCategory);
router.delete("/delete/:id", [middlewares_1.validarJWT, middlewares_1.validarCampos], categories_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=categories.js.map