// Packages
import express from "express";
import cors from "cors";

// Routes
import routesStore from "../routes/store";

class Server {
  app;
  port;

  routeStore: string;
  routeProducts: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.routeStore = "/api/stores";
    this.routeProducts = "api/products";

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
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("API ready 🥳");
    });
  }
}

export default Server;
