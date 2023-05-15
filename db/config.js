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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeQuery = exports.makePool = exports.connection = void 0;
const mysql_1 = __importDefault(require("mysql"));
const makePool = () => __awaiter(void 0, void 0, void 0, function* () {
    exports.connection = mysql_1.default.createConnection({
        host: process.env.HOST_BD,
        user: process.env.USER_BD,
        password: process.env.PASSWORD_BD,
        database: process.env.DATABASE_BD,
        port: parseInt(process.env.PORT_BD),
        // ssl: { ca: fs.readFileSync("{ca-cert filename}") },
    });
});
exports.makePool = makePool;
const makeQuery = (query, data) => {
    return new Promise((resolve, reject) => {
        exports.connection.query(query, data, (error, results) => {
            if (error)
                return reject(error);
            resolve(results);
        });
    });
};
exports.makeQuery = makeQuery;
//# sourceMappingURL=config.js.map