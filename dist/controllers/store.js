"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreById = exports.getStores = void 0;
// Packages
const { request, response } = require("express");
// Data
const data_1 = require("../helpers/data");
const getStores = (req = request, res = response) => {
    const { start = 0, to = 10 } = req.query;
    return res.json(data_1.stores);
};
exports.getStores = getStores;
const getStoreById = (req = request, res = response) => {
    const { id } = req.params;
    const element = data_1.storesComplete.filter((store) => store.id === id)[0];
    if (!element) {
        return res
            .status(404)
            .json({ msg: "No se encontro ningun resultado con el id suministrado" });
    }
    res.json({ element });
};
exports.getStoreById = getStoreById;
//# sourceMappingURL=store.js.map