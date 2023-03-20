// Packages
const { request, response } = require("express");

// Data
import { stores } from "../helpers/data";

export const getStores = (req = request, res = response) => {
  const { start = 0, to = 10 } = req.query;

  return res.json(stores);
};

export const getStoreById = () => {};
