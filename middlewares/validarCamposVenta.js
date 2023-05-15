"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const express_1 = require("express");
const validarCamposVenta = (req = express_1.request, res = express_1.response, next) => {
    const { products } = req.body;
    if (!products || products.length === 0) {
        return res
            .status(400)
            .json("No se puede hacer una venta con productos vacios");
    }
    products.forEach((product) => {
        if (!product.id || !product.amount) {
            res.status(400).json('Todo producto debe tener su "id" y su "cantidad"');
        }
    });
    next();
};
exports.default = validarCamposVenta;
//# sourceMappingURL=validarCamposVenta.js.map