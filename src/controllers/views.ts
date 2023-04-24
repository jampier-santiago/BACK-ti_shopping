// Packages
import { response, request } from "express";

export const getViews = (req = request, res = response) => {
  const { data, hour, store, product, category } = req.query;
};
