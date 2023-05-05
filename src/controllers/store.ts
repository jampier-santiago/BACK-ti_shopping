// Packages
import { request, response } from "express";

// Helpers
import { makeQuery } from "../db/config";

// Data
import { storesComplete } from "../helpers/data";
import { StoreResponseEntity } from "../data/stores.entity";

/**
 * Function for get all stores
 */
export const getStores = (req = request, res = response) => {
  const { start = 0, to = 10 } = req.query;

  makeQuery("select * from stores where state = '1'")
    .then((results: Array<StoreResponseEntity>) => {
      const data = results.map((result) => {
        const { state, Id_sellers, ...rest } = result;
        return rest;
      });

      res.json(data);
    })
    .catch((error) => res.status(500).json(error));
};

/**
 * Function for find a store
 */
export const getStoreById = (req = request, res = response) => {
  const { id } = req.params;

  makeQuery(`select * from stores where state = '1' AND Id_stores = ${id}`)
    .then((result: Array<StoreResponseEntity>) => {
      if (result.length > 0) {
        return res.json(result[0]);
      }

      return res.status(404).json("No se encontraron datos con ese id");
    })
    .catch((error) => res.status(500).json(error));
};

/**
 * Function for make a new store
 */
export const postStore = (req = request, res = response) => {
  const {
    name,
    address,
    webPage,
    facebook,
    instagram,
    phoneNumber,
    email,
    description,
    logo,
    mainColor,
    keyWords,
    accountBank,
  } = req.body;

  const id = 1;
  const state = true;

  res.json({
    id,
    name,
    address,
    webPage,
    facebook,
    instagram,
    phoneNumber,
    email,
    description,
    logo,
    mainColor,
    keyWords,
    accountBank,
    state,
  });
};

/**
 * Function for update a store
 */
export const putStore = (req = request, res = response) => {
  const { id } = req.params;

  const {
    name,
    address,
    webPage,
    facebook,
    instagram,
    phoneNumber,
    email,
    description,
    logo,
    mainColor,
    keyWords,
    accountBank,
  } = req.body;

  res.json({
    name,
    address,
    webPage,
    facebook,
    instagram,
    phoneNumber,
    email,
    description,
    logo,
    mainColor,
    keyWords,
    accountBank,
  });
};

/**
 * Function for hide a store
 */
export const deleteStore = (req = request, res = response) => {
  const { id } = req.params;

  const element = storesComplete.filter((store) => store.id === id)[0];

  if (!element) {
    return res
      .status(404)
      .json({ msg: "No se encontro una tienda relacionada con ese id" });
  }

  res.json(element);
};
