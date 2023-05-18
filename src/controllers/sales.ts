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
    .catch((error) => {
      return res.status(500).json(error);
    });
};

export const getDataForGraph = (req: any, res = response) => {
  const { idStore } = req.params;

  makeQuery(
    `SELECT prod.Name_product FROM sales_products_stores AS tbl_paso JOIN products AS prod ON tbl_paso.id_product = prod.Id_product WHERE tbl_paso.id_store = '${idStore}'`
  )
    .then((result) => {
      let data = [...result.map((resp: any) => resp.Name_product)];

      const dataForGraph: any = {};

      data.forEach((product: string) => {
        if (!dataForGraph[product]) {
          dataForGraph[product] = 0;
        }

        dataForGraph[product] += 1;
      });

      return res.json(dataForGraph);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

export const makeSale = (req: any, res = response) => {
  const { idStore, products, amount } = req.body;
  const userId = req.userId;

  const date = new Date();

  const data = {
    Date_sales: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
    Hour_sales: `${date.getHours()}:${date.getMinutes()}`,
    id_users: userId,
  };

  makeQuery(`INSERT INTO sales SET ?`, data)
    .then((result) => {
      const idSale = result.insertId;

      products.forEach((product: string, index: number) => {
        const dataTbl = {
          id_sale: idSale,
          id_product: product,
          id_store: idStore,
          amount,
        };

        makeQuery("INSERT INTO sales_products_stores SET ?", dataTbl).catch(
          (error) => {
            return res.status(500).json(error);
          }
        );

        if (index === products.length - 1)
          return res.json("Productos insertados con exito");
      });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};
