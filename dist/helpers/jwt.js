"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { uid: id };
        jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, { expiresIn: "5h" }, (error, token) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.default = generateJWT;
//# sourceMappingURL=jwt.js.map