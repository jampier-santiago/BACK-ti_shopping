// Packages
import { response, request } from "express";

const validarCamposVenta = (req = request, res = response, next: any) => {
  const { products } = req.body;

  if (!products || (products as Array<any>).length === 0) {
    return res
      .status(400)
      .json("No se puede hacer una venta con productos vacios");
  }

  (products as Array<any>).forEach((product) => {
    if (!product.id || !product.amount) {
      res.status(400).json('Todo producto debe tener su "id" y su "cantidad"');
    }
  });

  next();
};

export default validarCamposVenta;
