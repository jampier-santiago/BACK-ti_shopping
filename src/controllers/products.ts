// packages
import { response, request } from "express";
import { products } from "../helpers/data";

export const getProductById = (req = request, res = response) => {
  const { id } = req.params;

  const product = products.filter((element) => element.id === id)[0];

  if (!product) {
    return res.status(404).json({ msg: "No hay un producto con ese id" });
  }

  res.json(product);
};
