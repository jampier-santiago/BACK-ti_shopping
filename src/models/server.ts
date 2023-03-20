// Packages
import express from "express";
import cors from "cors";

class Server {
  app;
  port;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Parse responses
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("API ready 🥳");
    });
  }
}

export default Server;
