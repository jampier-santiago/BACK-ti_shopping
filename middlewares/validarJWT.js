"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarJWT = (req, res = express_1.response, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({ error: "No se recibio un token" });
    }
    try {
        const data = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.userId = data.uid;
    }
    catch (error) {
        res.status(401).json({ msg: "Token no valido" });
    }
    next();
};
exports.default = validarJWT;
//# sourceMappingURL=validarJWT.js.map