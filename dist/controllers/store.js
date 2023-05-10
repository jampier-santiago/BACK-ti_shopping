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
exports.deleteStore = exports.putStore = exports.postStore = exports.getStoreById = exports.getStores = void 0;
// Packages
const express_1 = require("express");
// Helpers
const config_1 = require("../db/config");
/**
 * Function for get all stores
 */
const getStores = (req = express_1.request, res = express_1.response) => {
    const { start = 0, to = 10 } = req.query;
    (0, config_1.makeQuery)("select * from stores where state = '1'")
        .then((results) => {
        const data = results.map((result) => {
            const { state } = result, rest = __rest(result, ["state"]);
            return rest;
        });
        res.json(data);
    })
        .catch((error) => res.status(500).json(error));
};
exports.getStores = getStores;
/**
 * Function for find a store
 */
const getStoreById = (req = express_1.request, res = express_1.response) => {
    const { id } = req.params;
    (0, config_1.makeQuery)(`select * from stores where state = '1' AND Id_stores = ${id}`)
        .then((result) => {
        if (result.length > 0) {
            return res.json(result[0]);
        }
        return res.status(404).json("No se encontraron datos con ese id");
    })
        .catch((error) => res.status(500).json(error));
};
exports.getStoreById = getStoreById;
/**
 * Function for make a new store
 */
const postStore = (req, res = express_1.response) => {
    const { name, address, webPage, facebook, instagram, phoneNumber, email, description, logo, mainColor, keyWords, accountBank, } = req.body;
    const data = {
        name_store: name,
        Id_sellers: req.userId,
        Address: address,
        Page_web: webPage,
        Facebook: facebook,
        Instagram: instagram,
        Num_telephone: phoneNumber,
        Email: email,
        business_description: description,
        Logo: logo,
        main_color: mainColor,
        keyword: keyWords,
        active_bank_account_number: accountBank,
        state: "1",
    };
    const query = `INSERT INTO stores SET ?`;
    (0, config_1.makeQuery)(query, data)
        .then(() => res.json("El registro fue creado con exito"))
        .catch((error) => res.status(500).json(error));
};
exports.postStore = postStore;
/**
 * Function for update a store
 */
const putStore = (req, res = express_1.response) => {
    const { id } = req.params;
    const { name, address, webPage, facebook, instagram, phoneNumber, email, description, logo, mainColor, keyWords, accountBank, } = req.body;
    const data = {
        name_store: name,
        Address: address,
        business_description: description,
        main_color: mainColor,
        keyword: keyWords,
        Email: email,
        active_bank_account_number: accountBank,
        Logo: logo,
        Num_telephone: phoneNumber,
        Instagram: instagram,
        Facebook: facebook,
        Page_web: webPage,
        Id_sellers: req.userId,
    };
    let query = "";
    Object.keys(data).forEach((brand) => {
        if (data[brand]) {
            query += `${brand} = '${data[brand]}', `;
        }
    });
    query = query.slice(0, -2) + query.slice(-1);
    (0, config_1.makeQuery)(`select * from stores where state = '1' AND Id_stores = ${id}`)
        .then((result) => {
        if (result.length > 0) {
            console.log(query);
            (0, config_1.makeQuery)(`UPDATE stores SET ${query.trim()} WHERE Id_stores = ${id};`)
                .then(() => res.json("Elemento actualizado con exito"))
                .catch((error) => res.status(500).json(error));
        }
        else {
            return res.json(404).json("No existe un usuario con estos datos");
        }
    })
        .catch((error) => res.status(500).json(error));
};
exports.putStore = putStore;
/**
 * Function for hide a store
 */
const deleteStore = (req = express_1.request, res = express_1.response) => {
    const { id } = req.params;
    (0, config_1.makeQuery)(`select * from stores where state = '1' AND Id_stores = ${id}`)
        .then((result) => {
        if (result.length > 0) {
            (0, config_1.makeQuery)(`UPDATE stores SET state = '0' WHERE Id_stores = ${id}`)
                .then(() => res.json("Tienda eliminada con exito"))
                .catch((error) => res.status(500).json(error));
        }
        else {
            return res.status(404).json("No se encontraron datos con ese id");
        }
    })
        .catch((error) => res.status(500).json(error));
};
exports.deleteStore = deleteStore;
//# sourceMappingURL=store.js.map