"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByStore = exports.deleteProduct = exports.makeProduct = exports.updateProduct = exports.getProductById = exports.getProducts = void 0;
// packages
const express_1 = require("express");
// Helpers
const config_1 = require("../db/config");
const data_1 = require("../helpers/data");
/**
 * Function for find a product by id
 */
const getProducts = (req = express_1.request, res = express_1.response) => {
    const { idStore } = req.params;
    (0, config_1.makeQuery)(`select * from products where state = '1' AND id_store = ${idStore}`)
        .then((results) => {
        const data = results.map((result) => {
            const { state, id_store } = result, rest = __rest(result, ["state", "id_store"]);
            return rest;
        });
        res.json(data);
    })
        .catch((error) => res.status(500).json(error));
};
exports.getProducts = getProducts;
/**
 * Function for find a product by id
 */
const getProductById = (req = express_1.request, res = express_1.response) => {
    const { id } = req.params;
    (0, config_1.makeQuery)(`select * from products where state = '1' and Id_product = ${id}`)
        .then((results) => {
        if (data_1.products.length > 0) {
            const data = results.map((result) => {
                const { state, id_store } = result, rest = __rest(result, ["state", "id_store"]);
                return rest;
            });
            res.json(data);
        }
        else {
            return res
                .status(404)
                .json("No se encontro ningun producto con este id");
        }
    })
        .catch((error) => res.status(500).json(error));
};
exports.getProductById = getProductById;
/**
 * Function for update a product
 */
const updateProduct = (req = express_1.request, res = express_1.response) => {
    const { id } = req.params;
    const { name, description, price, image } = req.body;
    let query = "";
    const data = {
        Name_product: name,
        Description_product: description,
        Price: price,
        image: image,
    };
    Object.keys(data).forEach((brand) => {
        if (data[brand]) {
            query += `${brand} = '${data[brand]}', `;
        }
    });
    query = query.slice(0, -2) + query.slice(-1);
    (0, config_1.makeQuery)(`SELECT * FROM products WHERE Id_product = '${id}'`)
        .then((results) => {
        if (results.length > 0) {
            (0, config_1.makeQuery)(`UPDATE products SET ${query.trim()} WHERE Id_product = '${id}';`)
                .then(() => res.json("Elemento actualizado con exito"))
                .catch((error) => res.status(500).json(error));
        }
        else {
            return res.json(404).json("No existe un usuario con estos datos");
        }
    })
        .catch((error) => {
        return res.status(500).json(error);
    });
};
exports.updateProduct = updateProduct;
/**
 * Function for make a new product
 */
const makeProduct = (req = express_1.request, res = express_1.response) => {
    const { name, description, price, images, id_store } = req.body;
    const data = {
        Name_product: name,
        Description_product: description,
        Price: price,
        state: 1,
        image: images,
        id_store,
    };
    (0, config_1.makeQuery)("INSERT INTO products SET ?", data)
        .then(() => res.json("Elemento insertado con exitoo"))
        .catch((error) => res.status(500).json(error));
};
exports.makeProduct = makeProduct;
/**
 * Function for hide a product
 */
const deleteProduct = (req = express_1.request, res = express_1.response) => {
    const { id } = req.params;
    (0, config_1.makeQuery)(`SELECT * FROM products WHERE Id_product = '${id}'`)
        .then((results) => {
        if (results.length > 0) {
            (0, config_1.makeQuery)(`UPDATE products SET state = '0' WHERE Id_product = '${id}';`)
                .then(() => res.json("Elemento eliminado con exito"))
                .catch((error) => res.status(500).json(error));
        }
        else {
            return res.json(404).json("No existe un usuario con estos datos");
        }
    })
        .catch((error) => {
        return res.status(500).json(error);
    });
};
exports.deleteProduct = deleteProduct;
/**
 * Function for get all products by store
 */
const getProductByStore = (req = express_1.request, res = express_1.response) => {
    const { id } = req.params;
    (0, config_1.makeQuery)(`select * from stores as stor join products prod on stor.Id_stores = prod.id_store where stor.Id_sellers = ${id}`)
        .then((results) => {
        const data = results.map((result) => {
            const { state, id_store } = result, rest = __rest(result, ["state", "id_store"]);
            return rest;
        });
        res.json(data);
    })
        .catch((error) => res.status(500).json(error));
};
exports.getProductByStore = getProductByStore;
//# sourceMappingURL=products.js.map