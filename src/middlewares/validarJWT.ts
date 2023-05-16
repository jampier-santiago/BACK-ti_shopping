import { response, request, json } from "express";
import jwt, { Secret } from "jsonwebtoken";

const validarJWT = (req: any, res = response, next: any) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({ error: "No se recibio un token" });
  }

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY as Secret);

    req.userId = (data as any).uid;
  } catch (error) {
    return res.status(401).json({ msg: "Token no valido" });
  }

  next();
};

export default validarJWT;
