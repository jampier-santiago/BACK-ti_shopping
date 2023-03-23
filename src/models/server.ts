// Packages
import express from "express";
import cors from "cors";

// Routes
import routesStore from "../routes/store";
import routesAuth from "../routes/auth";

class Server {
  app = express();
  port;

  routeStore: string;
  routeProducts: string;
  routeAuth: string;

  constructor() {
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
    this.app.use(cors());

    // Parse responses
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static("src/public"));
  }

  routes() {
    this.app.use(this.routeStore, routesStore);
    this.app.use(this.routeAuth, routesAuth);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`API ready 🥳, PORT = ${this.port}`);
    });
  }
}

export default Server;
