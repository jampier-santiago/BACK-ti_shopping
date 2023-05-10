"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Routes
const store_1 = __importDefault(require("../routes/store"));
const auth_1 = __importDefault(require("../routes/auth"));
const products_1 = __importDefault(require("../routes/products"));
const categories_1 = __importDefault(require("../routes/categories"));
const sales_1 = __importDefault(require("../routes/sales"));
// DB
const config_1 = require("../db/config");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.routeStore = "/api/stores";
        this.routeProducts = "/api/products";
        this.routeAuth = "/api/auth";
        this.routeCategories = "/api/categories";
        this.routeSales = "/api/sales";
        this.port = process.env.PORT || 3000;
        // db
        this.connectDB();
        // Middlewares
        this.middlewares();
        // Routes
        this.routes();
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Parse responses
        this.app.use(express_1.default.json());
        // Directorio publico
        this.app.use(express_1.default.static("src/public"));
    }
    routes() {
        this.app.use(this.routeStore, store_1.default);
        this.app.use(this.routeAuth, auth_1.default);
        this.app.use(this.routeProducts, products_1.default);
        this.app.use(this.routeCategories, categories_1.default);
        this.app.use(this.routeSales, sales_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`API ready 🥳, PORT = ${this.port}`);
        });
    }
    connectDB() {
        (0, config_1.makePool)()
            .then(() => console.log("Success"))
            .catch((error) => console.log(error));
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map