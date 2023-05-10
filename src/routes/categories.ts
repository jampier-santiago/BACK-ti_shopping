// Pacakages
import { Router } from "express";
import { check } from "express-validator";

// Middlewares
import { validarJWT, validarCampos } from "../middlewares";

// Controllers
import {
  getCategories,
  getCategoryById,
  makeNewCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories";

const router = Router();

router.get("/", getCategories);

router.get("/:id", getCategoryById);

router.post(
  "/new-category",
  [
    validarJWT,
    check("name", "El nombre de la categoria es obligatorio").notEmpty(),
    validarCampos,
  ],
  makeNewCategory
);

router.put(
  "/update/:id",
  [
    validarJWT,
    check("name", "El nombre de la categoria es obligatorio").notEmpty(),
    validarCampos,
  ],
  updateCategory
);

router.delete("/delete/:id", [validarJWT, validarCampos], deleteCategory);

export default router;
