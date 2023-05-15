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
  const { idStore } = req.params;

  makeQuery(
    `select * from products where state = '1' AND id_store = ${idStore}`
  )
    .then((results: Array<ProductResponseEntity>) => {
      const data = results.map((result) => {
        const { state, id_store, ...rest } = result;
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
          const { state, id_store, ...rest } = result;
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
  const { name, description, price, image } = req.body;

  let query = "";

  const data: any = {
    Name_product: name,
    Description_product: description,
    Price: price,
    image: image,
  };

  Object.keys(data).forEach((brand) => {
    if (data[brand]) {
      query += `${brand} = '${data[brand]}', `;
    }
  });

  query = query.slice(0, -2) + query.slice(-1);

  makeQuery(`SELECT * FROM products WHERE Id_product = '${id}'`)
    .then((results: Array<ProductResponseEntity>) => {
      if (results.length > 0) {
        makeQuery(
          `UPDATE products SET ${query.trim()} WHERE Id_product = '${id}';`
        )
          .then(() => res.json("Elemento actualizado con exito"))
          .catch((error) => res.status(500).json(error));
      } else {
        return res.json(404).json("No existe un usuario con estos datos");
      }
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

/**
 * Function for make a new product
 */
export const makeProduct = (req = request, res = response) => {
  const { name, description, price, images, id_store } = req.body;

  const data = {
    Name_product: name,
    Description_product: description,
    Price: price,
    state: 1,
    image: images,
    id_store: parseInt(id_store),
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

  makeQuery(`SELECT * FROM products WHERE Id_product = '${id}'`)
    .then((results: Array<ProductResponseEntity>) => {
      if (results.length > 0) {
        makeQuery(`UPDATE products SET state = '0' WHERE Id_product = '${id}';`)
          .then(() => res.json("Elemento eliminado con exito"))
          .catch((error) => res.status(500).json(error));
      } else {
        return res.json(404).json("No existe un usuario con estos datos");
      }
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

/**
 * Function for get all products by store
 */
export const getProductByStore = (req = request, res = response) => {
  const { id } = req.params;

  makeQuery(
    `select Id_product, Name_product, Description_product, Price, image from stores as stor join products prod on stor.Id_stores = prod.id_store where stor.Id_sellers = ${id}`
  )
    .then((results: Array<ProductResponseEntity>) => {
      const data = results.map((result) => {
        const { state, id_store, ...rest } = result;
        return rest;
      });

      res.json(data);
    })
    .catch((error) => res.status(500).json(error));
};
