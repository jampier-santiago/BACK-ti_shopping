// Packages
const { request, response } = require("express");

// Data
import { stores, storesComplete } from "../helpers/data";

export const getStores = (req = request, res = response) => {
  const { start = 0, to = 10 } = req.query;

  return res.json(stores);
};

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
