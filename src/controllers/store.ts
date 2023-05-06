// Packages
import { request, response } from "express";

// Helpers
import { makeQuery } from "../db/config";

// Data
import { StoreResponseEntity } from "../data/stores.entity";

/**
 * Function for get all stores
 */
export const getStores = (req = request, res = response) => {
  const { start = 0, to = 10 } = req.query;

  makeQuery("select * from stores where state = '1'")
    .then((results: Array<StoreResponseEntity>) => {
      const data = results.map((result) => {
        const { state, ...rest } = result;
        return rest;
      });

      res.json(data);
    })
    .catch((error) => res.status(500).json(error));
};

/**
 * Function for find a store
 */
export const getStoreById = (req = request, res = response) => {
  const { id } = req.params;

  makeQuery(`select * from stores where state = '1' AND Id_stores = ${id}`)
    .then((result: Array<StoreResponseEntity>) => {
      if (result.length > 0) {
        return res.json(result[0]);
      }

      return res.status(404).json("No se encontraron datos con ese id");
    })
    .catch((error) => res.status(500).json(error));
};

/**
 * Function for make a new store
 */
export const postStore = (req: any, res = response) => {
  const {
    name,
    address,
    webPage,
    facebook,
    instagram,
    phoneNumber,
    email,
    description,
    logo,
    mainColor,
    keyWords,
    accountBank,
  } = req.body;

  const data = {
    name_store: name,
    Id_sellers: req.userId,
    Address: address,
    Page_web: webPage,
    Facebook: facebook,
    Instagram: instagram,
    Num_telephone: phoneNumber,
    Email: email,
    business_description: description,
    Logo: logo,
    main_color: mainColor,
    keyword: keyWords,
    active_bank_account_number: accountBank,
    state: "1",
  };

  const query = `INSERT INTO stores SET ?`;

  makeQuery(query, data)
    .then(() => res.json("El registro fue creado con exito"))
    .catch((error) => res.status(500).json(error));
};

/**
 * Function for update a store
 */
export const putStore = (req = request, res = response) => {
  const { id } = req.params;

  const {
    name,
    address,
    webPage,
    facebook,
    instagram,
    phoneNumber,
    email,
    description,
    logo,
    mainColor,
    keyWords,
    accountBank,
  } = req.body;

  res.json({
    name,
    address,
    webPage,
    facebook,
    instagram,
    phoneNumber,
    email,
    description,
    logo,
    mainColor,
    keyWords,
    accountBank,
  });
};

/**
 * Function for hide a store
 */
export const deleteStore = (req = request, res = response) => {
  const { id } = req.params;

  makeQuery(`select * from stores where state = '1' AND Id_stores = ${id}`)
    .then((result: Array<StoreResponseEntity>) => {
      if (result.length > 0) {
        makeQuery(`UPDATE stores SET state = '0' WHERE Id_stores = ${id}`)
          .then(() => res.json("Tienda eliminada con exito"))
          .catch((error) => res.status(500).json(error));
      } else {
        return res.status(404).json("No se encontraron datos con ese id");
      }
    })
    .catch((error) => res.status(500).json(error));
};
