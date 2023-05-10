// Packages
import { response, request } from "express";

// Helpers
import { makeQuery } from "../db/config";

// WHERE pro.Fecha_Produccion BETWEEN ${connection.escape(dates.fecha_inicial)}
//   AND ${connection.escape(
//     dates.fecha_final
//   )}

/**
 * Get all views of products
 */
export const getViewsProducts = (req = request, res = response) => {
  const { hour, store } = req.query;
};

/**
 * Get all views of categories
 */
export const getViewsCategories = (req = request, res = response) => {
  const { hour, store, category } = req.query;
};
