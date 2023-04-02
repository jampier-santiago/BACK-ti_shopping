"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
// Packages
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validarCampos = (req = express_1.request, res = express_1.response, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
exports.validarCampos = validarCampos;
//# sourceMappingURL=validarCampos.js.map