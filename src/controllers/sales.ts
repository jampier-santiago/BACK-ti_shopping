// Packages
import { response } from "express";

// Helpers
import { makeQuery } from "../db/config";

// Interface
import { SalesResponseEntity } from "../data/sales.entity";

export const getAllSales = (req: any, res = response) => {
  const { idStore } = req.params;

  makeQuery(
    `SELECT tbl_paso.id_sale, prod.Name_product, tbl_paso.amount, stor.name_store, sal.Date_sales, sal.Hour_sales FROM sales_products_stores tbl_paso JOIN stores stor ON tbl_paso.id_store = stor.Id_stores JOIN products prod ON tbl_paso.id_product = prod.Id_product JOIN sales sal ON tbl_paso.id_sale = sal.Id_sales WHERE tbl_paso.id_store = '${idStore}'`
  )
    .then((result: Array<SalesResponseEntity>) => {
      let data: Array<SalesResponseEntity> = [...result];

      return res.json(data);
    })
    .catch((error) => res.status(500).json(error));
};

export const makeSale = (req: any, res = response) => {
  const { idStore, idPorduct, amount } = req.body;
  const userId = req.userId;

  const date = new Date();

  const data = {
    Date_sales: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    Hour_sales: `${date.getHours()}:${date.getMinutes()}`,
    id_users: userId,
  };

  makeQuery(`INSERT INTO sales SET ?`, data)
    .then((result) => {
      const idSale = result.insertId;

      const dataTbl = {
        id_sale: idSale,
        id_product: idPorduct,
        id_store: idStore,
        amount,
      };

      makeQuery("INSERT INTO sales_products_stores SET ?", dataTbl)
        .then((result) => {
          return res.json("Venta terminada con exito");
        })
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
};
