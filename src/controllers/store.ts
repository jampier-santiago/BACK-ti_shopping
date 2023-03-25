// Packages
const { request, response } = require("express");

// Data
import { stores, storesComplete } from "../helpers/data";

/**
 * Function for get all stores
 */
export const getStores = (req = request, res = response) => {
  const { start = 0, to = 10 } = req.query;

  return res.json(stores);
};

/**
 * Function for find a store
 */
export const getStoreById = (req = request, res = response) => {
  const { id } = req.params;

  const element = storesComplete.filter((store) => store.id === id)[0];

  if (!element) {
    return res
      .status(404)
      .json({ msg: "No se encontro ningun resultado con el id suministrado" });
  }

  res.json({ element });
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
