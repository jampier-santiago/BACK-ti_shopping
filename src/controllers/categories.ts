// Packages
import { response, request } from "express";

// Helpers
import { makeQuery } from "../db/config";

// Intefaces
import { CategoryResponseEntity } from "../data/categories.entity";

// data
import { categories } from "../helpers/data";

/**
 * Function for get all categories
 */
export const getCategories = (req = request, res = response) => {
  makeQuery("SELECT * from categories")
    .then((result: Array<CategoryResponseEntity>) => {
      res.json(result);
    })
    .catch((error) => res.status(500).json(error));
};

/**
 * Function for find a category by id
 */
export const getCategoryById = (req = request, res = response) => {
  const { id } = req.params;

  makeQuery(`SELECT * from categories WHERE Id_categories = ${id}`)
    .then((result: Array<CategoryResponseEntity>) => {
      if (!result || result.length === 0) {
        return res.status(404).json({
          msg: "No se encontro una categoria relacionada con ese id",
        });
      }

      return res.json(result);
    })
    .catch((error) => res.status(500).json(error));
};

/**
 * Function for make a new category
 */
export const makeNewCategory = (req = request, res = response) => {
  const { name: name_categoria } = req.body;

  makeQuery("INSERT INTO categories SET ?", { name_categoria })
    .then(() => {
      res.json("Categoria creada con exito");
    })
    .catch((error) => res.status(500).json(error));
};

/**
 * Function for updae a category
 */
export const updateCategory = (req = request, res = response) => {
  const { id } = req.params;
  const { name } = req.body;

  makeQuery(`SELECT * from categories WHERE Id_categories = ${id}`)
    .then((result: Array<CategoryResponseEntity>) => {
      if (!result || result.length === 0) {
        return res.status(404).json({
          msg: "No se encontro una categoria relacionada con ese id",
        });
      }

      makeQuery(
        `UPDATE categories SET name_categoria = '${name}' WHERE Id_categories = '${id}'; `
      )
        .then(() => res.json("Categoria actualizada con exito"))
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
};

/**
 * Function for hide a category
 */
export const deleteCategory = (req = request, res = response) => {
  const { id } = req.params;

  makeQuery(`SELECT * from categories WHERE Id_categories = ${id}`)
    .then((result: Array<CategoryResponseEntity>) => {
      if (!result || result.length === 0) {
        return res.status(404).json({
          msg: "No se encontro una categoria relacionada con ese id",
        });
      } else {
        makeQuery(
          `UPDATE categories SET state = '0' WHERE Id_categories = '${id}'; `
        )
          .then(() => res.json("Categoria eliminada con exito"))
          .catch((error) => res.status(500).json(error));
      }
    })
    .catch((error) => res.status(500).json(error));
};
