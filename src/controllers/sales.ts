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
  const { idStore, products } = req.body;
  const userId = req.userId;

  const date = new Date();

  makeQuery(
    `INSERT INTO sales (Date_sales, Hour_sales) VALUES ('${date.getDate()}/${date.getMonth()}/${date.getFullYear()}', '${
      date.getHours
    }:${date.getMinutes()}')`
  )
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => res.status(500).json(error));
};
