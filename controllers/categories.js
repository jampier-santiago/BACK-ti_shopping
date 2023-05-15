"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.makeNewCategory = exports.getCategoryById = exports.getCategories = void 0;
// Packages
const express_1 = require("express");
// Helpers
const config_1 = require("../db/config");
/**
 * Function for get all categories
 */
const getCategories = (req = express_1.request, res = express_1.response) => {
    (0, config_1.makeQuery)("SELECT * from categories")
        .then((result) => {
        res.json(result);
    })
        .catch((error) => res.status(500).json(error));
};
exports.getCategories = getCategories;
/**
 * Function for find a category by id
 */
const getCategoryById = (req = express_1.request, res = express_1.response) => {
    const { id } = req.params;
    (0, config_1.makeQuery)(`SELECT * from categories WHERE Id_categories = ${id}`)
        .then((result) => {
        if (!result || result.length === 0) {
            return res.status(404).json({
                msg: "No se encontro una categoria relacionada con ese id",
            });
        }
        return res.json(result);
    })
        .catch((error) => res.status(500).json(error));
};
exports.getCategoryById = getCategoryById;
/**
 * Function for make a new category
 */
const makeNewCategory = (req = express_1.request, res = express_1.response) => {
    const { name: name_categoria } = req.body;
    (0, config_1.makeQuery)("INSERT INTO categories SET ?", { name_categoria })
        .then(() => {
        res.json("Categoria creada con exito");
    })
        .catch((error) => res.status(500).json(error));
};
exports.makeNewCategory = makeNewCategory;
/**
 * Function for updae a category
 */
const updateCategory = (req = express_1.request, res = express_1.response) => {
    const { id } = req.params;
    const { name } = req.body;
    (0, config_1.makeQuery)(`SELECT * from categories WHERE Id_categories = ${id}`)
        .then((result) => {
        if (!result || result.length === 0) {
            return res.status(404).json({
                msg: "No se encontro una categoria relacionada con ese id",
            });
        }
        (0, config_1.makeQuery)(`UPDATE categories SET name_categoria = '${name}' WHERE Id_categories = '${id}'; `)
            .then(() => res.json("Categoria actualizada con exito"))
            .catch((error) => res.status(500).json(error));
    })
        .catch((error) => res.status(500).json(error));
};
exports.updateCategory = updateCategory;
/**
 * Function for hide a category
 */
const deleteCategory = (req = express_1.request, res = express_1.response) => {
    const { id } = req.params;
    (0, config_1.makeQuery)(`SELECT * from categories WHERE Id_categories = ${id}`)
        .then((result) => {
        if (!result || result.length === 0) {
            return res.status(404).json({
                msg: "No se encontro una categoria relacionada con ese id",
            });
        }
        else {
            (0, config_1.makeQuery)(`UPDATE categories SET state = '0' WHERE Id_categories = '${id}'; `)
                .then(() => res.json("Categoria eliminada con exito"))
                .catch((error) => res.status(500).json(error));
        }
    })
        .catch((error) => res.status(500).json(error));
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categories.js.map