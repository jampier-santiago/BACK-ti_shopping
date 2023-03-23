"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Routes
const store_1 = __importDefault(require("../routes/store"));
const auth_1 = __importDefault(require("../routes/auth"));
class Server {
  constructor() {
    this.app = (0, express_1.default)();
    this.port = process.env.PORT || 3000;
    this.routeStore = "/api/stores";
    this.routeProducts = "api/products";
    this.routeAuth = "/api/auth";
    // Middlejares
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
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`API ready 🥳, PORT = ${this.port}`);
    });
  }
}
exports.default = Server;
//# sourceMappingURL=server.js.map
