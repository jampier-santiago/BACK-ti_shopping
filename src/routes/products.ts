// Packages
import { Router } from "express";
import { check } from "express-validator";

// Controllers
import {
  getProductById,
  makeProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductByStore,
  getAllProducts,
} from "../controllers/products";

// Middlewares
import { validarCampos, validarJWT } from "../middlewares";

const router = Router();

router.get("/", getAllProducts);

router.get("/store/:idStore", getProducts);

router.get("/:id", getProductById);
router.get("/user/:id", getProductByStore);

router.post(
  "/new-product",
  [
    validarJWT,
    check("name", "El nombre del producto es obligatorio").notEmpty(),
    check(
      "description",
      "La descripción del producto es obligatorio"
    ).notEmpty(),
    check("price", "El precio es obligatorio").notEmpty(),
    check("category", "No es un id valido para una categoria").notEmpty(),
    check(
      "id_store",
      "El id de la tienda a la que pertenece el producto es obligatorio"
    ).notEmpty(),
    check("brand", "La marca del producto es obligatoria").notEmpty(),
    validarCampos,
  ],
  makeProduct
);

router.put("/update/:id", [validarJWT, validarCampos], updateProduct);

router.delete("/delete/:id", [validarJWT, validarCampos], deleteProduct);

export default router;
