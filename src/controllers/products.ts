// packages
import { response, request } from "express";

// Helpers
import { makeQuery } from "../db/config";

import { products } from "../helpers/data";
import { ProductResponseEntity } from "data/products.entity";

/**
 * Function for find a product by id
 */
export const getProducts = (req = request, res = response) => {
  makeQuery("select * from products where state = '1'")
    .then((results: Array<ProductResponseEntity>) => {
      const data = results.map((result) => {
        const { state, ...rest } = result;
        return rest;
      });

      res.json(data);
    })
    .catch((error) => res.status(500).json(error));
};

/**
 * Function for find a product by id
 */
export const getProductById = (req = request, res = response) => {
  const { id } = req.params;

  makeQuery(`select * from products where state = '1' and Id_product = ${id}`)
    .then((results: Array<ProductResponseEntity>) => {
      if (products.length > 0) {
        const data = results.map((result) => {
          const { state, ...rest } = result;
          return rest;
        });

        res.json(data);
      } else {
        return res
          .status(404)
          .json("No se encontro ningun producto con este id");
      }
    })
    .catch((error) => res.status(500).json(error));
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
  const { name, description, price, images } = req.body;

  const data = {
    Name_product: name,
    Description_product: description,
    Price: price,
    state: 1,
    image: images,
  };

  makeQuery("INSERT INTO products SET ?", data)
    .then(() => res.json("Elemento insertado con exitoo"))
    .catch((error) => res.status(500).json(error));
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
