import dotenv from "dotenv";

// Server
import Server from "./models/server";

dotenv.config();

const server = new Server();

server.listen();
