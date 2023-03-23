// Packages
import express from "express";
import cors from "cors";

// Routes
import routesStore from "../routes/store";
import routesAuth from "../routes/auth";

class Server {
  app;
  port;

  routeStore: string;
  routeProducts: string;
  routeAuth: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

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
  }

  routes() {
    this.app.use(this.routeStore, routesStore);
    this.app.use(this.routeAuth, routesAuth);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("API ready 🥳");
    });
  }
}

export default Server;
