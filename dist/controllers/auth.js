"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUser = exports.login = void 0;
// Packages
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Data
const data_1 = require("../helpers/data");
// Helpers
const jwt_1 = __importDefault(require("../helpers/jwt"));
const login = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.query;
    let user;
    let isUser = false;
    const findClient = data_1.clients.filter((client) => client.email === email)[0];
    if (!findClient) {
        const findSeller = data_1.sellers.filter((seller) => seller.email === email)[0];
        if (!findSeller) {
            return res
                .status(404)
                .json({ msg: "No se encontro ningun usuario con estas credenciales" });
        }
        user = findSeller;
        if (!bcryptjs_1.default.compareSync(password, findSeller.password)) {
            return res.status(404).json({
                msg: "El password no esta relacionado con la información de nuestros usuarios",
            });
        }
    }
    if (findClient &&
        !bcryptjs_1.default.compareSync(password, findClient.password)) {
        return res.status(404).json({
            msg: "El password no esta relacionado con la información de nuestros usuarios",
        });
    }
    if (findClient) {
        isUser = true;
        user = findClient;
    }
    const token = yield (0, jwt_1.default)(user.id);
    const { password: p, birthDate } = user, resto = __rest(user, ["password", "birthDate"]);
    res.json({ resto, role: isUser ? "CLIENT" : "SELLER", token });
});
exports.login = login;
const newUser = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, secondName, surname, secondSurname, phoneNumber, email, address, birthDate, password, role, } = req.body;
    const id = "2";
    const token = yield (0, jwt_1.default)(id);
    const salt = bcryptjs_1.default.genSaltSync();
    const passwordModificated = bcryptjs_1.default.hashSync(password, salt);
    res.json({
        id,
        fullName: `${firstName} ${secondName} ${surname} ${secondSurname}`,
        role,
        token,
    });
});
exports.newUser = newUser;
//# sourceMappingURL=auth.js.map