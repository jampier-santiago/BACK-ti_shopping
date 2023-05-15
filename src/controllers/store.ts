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

export const getStoreByUser = (req: any, res = response) => {
  const id = req.userId;

  makeQuery(
    `select Id_stores, name_store, Address, Page_web, Facebook, Instagram, Num_telephone, Email, business_description, logo, main_color, keyword, active_bank_account_number from stores where state = '1' AND Id_sellers = ${id}`
  )
    .then((result) => {
      if (result.length > 0) {
        return res.json(result[0]);
      }

      return res.status(404).json("No se encontraron datos con ese id");
    })
    .catch((error) => res.status(500).json(error));
};

/**
 * Function for get all stores
 */
export const getStoresAdmin = (req = request, res = response) => {
  makeQuery("select * from stores")
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
export const putStore = (req: any, res = response) => {
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

  const data: any = {
    name_store: name,
    Address: address,
    business_description: description,
    main_color: mainColor,
    keyword: keyWords,
    Email: email,
    active_bank_account_number: accountBank,
    Logo: logo,
    Num_telephone: phoneNumber,
    Instagram: instagram,
    Facebook: facebook,
    Page_web: webPage,
    Id_sellers: req.userId,
  };

  let query = "";

  Object.keys(data).forEach((brand) => {
    if (data[brand]) {
      query += `${brand} = '${data[brand]}', `;
    }
  });

  query = query.slice(0, -2) + query.slice(-1);

  makeQuery(`select * from stores where state = '1' AND Id_stores = ${id}`)
    .then((result: Array<StoreResponseEntity>) => {
      if (result.length > 0) {
        console.log(query);
        makeQuery(`UPDATE stores SET ${query.trim()} WHERE Id_stores = ${id};`)
          .then(() => res.json("Elemento actualizado con exito"))
          .catch((error) => res.status(500).json(error));
      } else {
        return res.json(404).json("No existe un usuario con estos datos");
      }
    })
    .catch((error) => res.status(500).json(error));
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
