// Packages
import express from "express";
import cors from "cors";

// Routes
import routesStore from "../routes/store";
import routesAuth from "../routes/auth";
import routesProducts from "../routes/products";
import routesCategories from "../routes/categories";

class Server {
  app = express();
  port;

  routeStore: string = "/api/stores";
  routeProducts: string = "/api/products";
  routeAuth: string = "/api/auth";
  routeCategories: string = "/api/categories";

  constructor() {
    this.port = process.env.PORT || 3000;

    // Middlewares
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
    this.app.use(this.routeProducts, routesProducts);
    this.app.use(this.routeCategories, routesCategories);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`API ready 🥳, PORT = ${this.port}`);
    });
  }
}

export default Server;
