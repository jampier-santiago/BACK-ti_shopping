// packages
import { response, request } from "express";
import { products } from "../helpers/data";

/**
 * Function for find a product by id
 */
export const getProductById = (req = request, res = response) => {
  const { id } = req.params;

  const product = products.filter((element) => element.id === id)[0];

  if (!product) {
    return res.status(404).json({ msg: "No hay un producto con ese id" });
  }

  res.json(product);
};

/**
 * Function for update a product
 */
export const updateProduct = (req = request, res = response) => {
  const { id } = req.params;
  const { name } = req.body;

  const product = products.filter((element) => element.id === id)[0];

  if (!product) {
    return res.status(404).json({ msg: "No hay un producto con ese id" });
  }

  res.json(product);
};

/**
 * Function for make a new product
 */
export const makeProduct = (req = request, res = response) => {
  const { name, description, price, images, category, store, brand } = req.body;

  res.json({ name, description, price, images, category, store, brand });
};

/**
 * Function for hide a product
 */
export const deleteProduct = (req = request, res = response) => {
  const { id } = req.params;

  const product = products.filter((element) => element.id === id)[0];

  if (!product) {
    return res.status(404).json({ msg: "No hay un producto con ese id" });
  }

  res.json(product);
};
