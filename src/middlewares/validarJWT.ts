import { response, request } from "express";
import jwt, { Secret } from "jsonwebtoken";

const validarJWT = (req = request, res = response, next: any) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({ error: "No se recibio un token" });
  }

  const data = jwt.verify(token, process.env.SECRET_KEY as Secret);

  console.log(data);

  next();
};

export default validarJWT;
