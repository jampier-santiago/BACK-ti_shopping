"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getViewsCategories = exports.getViewsProducts = void 0;
// Packages
const express_1 = require("express");
// WHERE pro.Fecha_Produccion BETWEEN ${connection.escape(dates.fecha_inicial)}
//   AND ${connection.escape(
//     dates.fecha_final
//   )}
/**
 * Get all views of products
 */
const getViewsProducts = (req = express_1.request, res = express_1.response) => {
    const { hour, store } = req.query;
};
exports.getViewsProducts = getViewsProducts;
/**
 * Get all views of categories
 */
const getViewsCategories = (req = express_1.request, res = express_1.response) => {
    const { hour, store, category } = req.query;
};
exports.getViewsCategories = getViewsCategories;
//# sourceMappingURL=views.js.map