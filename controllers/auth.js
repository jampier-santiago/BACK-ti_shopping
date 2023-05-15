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
exports.updateUser = exports.activeUser = exports.deleteUser = exports.newUser = exports.login = exports.getAllUsers = void 0;
// Packages
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../db/config");
// Helpers
const jwt_1 = __importDefault(require("../helpers/jwt"));
/**
 * Function for get all clients
 */
const getAllUsers = (req = express_1.request, res = express_1.response) => {
    (0, config_1.makeQuery)(`SELECT * FROM people WHERE state = '1'`)
        .then((results) => {
        return res.json(results);
    })
        .catch((error) => {
        return res.status(500).json(error);
    });
};
exports.getAllUsers = getAllUsers;
/**
 * Function for do login
 */
const login = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    (0, config_1.makeQuery)(`SELECT * FROM people WHERE email = '${email}' AND state = '1'`)
        .then((results) => {
        if (results.length > 0) {
            const data = results[0];
            if (!bcryptjs_1.default.compareSync(password, data.password || "")) {
                return res.status(404).json({
                    msg: "El password no esta relacionado con la información de nuestros usuarios",
                });
            }
            (0, jwt_1.default)(data.Id_people.toString()).then((token) => {
                const { state, password, birthdate, f_name, s_name, f_lastname, s_lastname, Id_people, rol } = data, resto = __rest(data, ["state", "password", "birthdate", "f_name", "s_name", "f_lastname", "s_lastname", "Id_people", "rol"]);
                const userName = `${f_name} ${s_name} ${f_lastname} ${s_lastname}`;
                return res.json(Object.assign(Object.assign({}, resto), { token,
                    userName, id: Id_people, role: data.rol }));
            });
        }
        else {
            return res.json(404).json("No existe un usuario con estos datos");
        }
    })
        .catch((error) => {
        return res.status(500).json(error);
    });
});
exports.login = login;
/**
 * Funciton for make a new user
 */
const newUser = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, secondName, surname, secondSurname, phoneNumber, email, address, birthDate, password, N_credit_card, credit_card_expiration_date, CVC, } = req.body;
    const salt = bcryptjs_1.default.genSaltSync();
    const passwordModificated = bcryptjs_1.default.hashSync(password, salt);
    const date = new Date();
    (0, config_1.makeQuery)("INSERT INTO people SET ?", {
        state: 1,
        email: email,
        birthdate: birthDate,
        f_name: firstName.toLowerCase(),
        s_name: secondName.toLowerCase(),
        f_lastname: surname.toLowerCase(),
        s_lastname: secondSurname.toLowerCase(),
        num_telephone: phoneNumber,
        address: address.toLowerCase(),
        creation_date: `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()}/${date.getFullYear()}`,
        password: passwordModificated,
        N_credit_card,
        CVC,
        credit_card_expiration_date,
        rol: "CLIENT",
    })
        .then(() => express_1.response.status(200).json("Elemento insertado con exito"))
        .catch((error) => res.status(500).json(error));
});
exports.newUser = newUser;
/**
 * Function for hide a user
 */
const deleteUser = (req = express_1.request, res = express_1.response) => {
    const { id } = req.params;
    (0, config_1.makeQuery)(`SELECT * FROM people WHERE Id_people = '${id}'`)
        .then((results) => {
        if (results.length > 0) {
            (0, config_1.makeQuery)(`UPDATE people SET state = '0' WHERE Id_people = '${id}'; `)
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
exports.deleteUser = deleteUser;
/**
 *
 *  Function for active a some user
 */
const activeUser = (req = express_1.request, res = express_1.response) => {
    const { id } = req.params;
    (0, config_1.makeQuery)(`SELECT * FROM people WHERE Id_people = '${id}'`)
        .then((results) => {
        if (results.length > 0) {
            (0, config_1.makeQuery)(`UPDATE people SET state = '1' WHERE Id_people = '${id}'; `)
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
exports.activeUser = activeUser;
/**
 * Update user
 */
const updateUser = (req = express_1.request, res = express_1.response) => {
    const { id } = req.params;
    const { firstName, secondName, surname, secondSurname, phoneNumber, email, address, N_credit_card, credit_card_expiration_date, CVC, } = req.body;
    const data = {
        f_name: firstName,
        s_name: secondName,
        f_lastname: surname,
        s_lastname: secondSurname,
        num_telephone: phoneNumber,
        email: email,
        address: address,
        N_credit_card: N_credit_card,
        credit_card_expiration_date: credit_card_expiration_date,
        CVC: CVC,
    };
    let query = "";
    Object.keys(data).forEach((brand) => {
        if (data[brand]) {
            query += `${brand} = '${data[brand]}', `;
        }
    });
    query = query.slice(0, -2) + query.slice(-1);
    (0, config_1.makeQuery)(`SELECT * FROM people WHERE Id_people = '${id}'`)
        .then((results) => {
        if (results.length > 0) {
            (0, config_1.makeQuery)(`UPDATE people SET ${query.trim()} WHERE Id_people = '${id}';`)
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
exports.updateUser = updateUser;
//# sourceMappingURL=auth.js.map