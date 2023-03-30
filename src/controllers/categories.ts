// Packages
import { response, request } from "express";

// data
import { categories } from "../helpers/data";

/**
 * Function for get all categories
 */
export const getCategories = (req = request, res = response) => {
  res.json(categories);
};

/**
 * Function for find a category by id
 */
export const getCategoryById = (req = request, res = response) => {
  const { id } = req.params;

  const category = categories.filter((element) => element.id === id)[0];

  if (!category) {
    return res
      .status(404)
      .json({ msg: "No se encontro una categoria relacionada con ese id" });
  }

  res.json(category);
};

/**
 * Function for make a new category
 */
export const makeNewCategory = (req = request, res = response) => {
  const { name } = req.body;

  res.json({ name, id: "1238" });
};

/**
 * Function for updae a category
 */
export const updateCategory = (req = request, res = response) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = categories.filter((element) => element.id === id)[0];

  if (!category) {
    return res
      .status(404)
      .json({ msg: "No se encontro ninguna categoria que coincida con el id" });
  }

  res.json({ name });
};

/**
 * Function for hide a category
 */
export const deleteCategory = (req = request, res = response) => {
  const { id } = req.params;

  const category = categories.filter((element) => element.id === id)[0];

  if (!category) {
    return res
      .status(404)
      .json({ msg: "No se encontro ninguna categoria que coincida con el id" });
  }

  res.json(category);
};
