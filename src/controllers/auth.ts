// Packages
import { request, response } from "express";
import bcryptjs from "bcryptjs";

import { connection, makeQuery } from "../db/config";

// Data
import { clients, sellers } from "../helpers/data";

import { SellerResponseEntity } from "../data/seller.entity";
import { CustomerResponseEntity } from "data/customer.entity";

// Helpers
import generateJWT from "../helpers/jwt";

const searchSeller = (
  req = request,
  res = response,
  sellers: Array<SellerResponseEntity>,
  email: string,
  password: string
) => {
  const findClient = sellers.filter((client) => client.email === email)[0];

  if (findClient) {
    if (!bcryptjs.compareSync(password, findClient.Password)) {
      return res.status(404).json({
        msg: "El password no esta relacionado con la información de nuestros usuarios",
      });
    }

    generateJWT(findClient.Id_sellers.toString()).then((token) => {
      const {
        state,
        Password,
        birthdate,
        f_name,
        s_name,
        f_lastname,
        s_lastname,
        ...resto
      } = findClient;

      const userName = `${f_name} ${s_name} ${f_lastname} ${s_lastname}`;
      return res.json({ ...resto, token, userName, role: "SELLER" });
    });
  } else {
    makeQuery(
      "SELECT * FROM customers cu JOIN people as pe where cu.Id_CUSTOMERS = pe.Id_people;"
    )
      .then((result: Array<CustomerResponseEntity>) => {
        return searchCustomer(req, res, result, email, password);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
};

const searchCustomer = (
  req = request,
  res = response,
  results: Array<CustomerResponseEntity>,
  email: string,
  password: string
) => {
  const findClient = results.filter((client) => client.email === email)[0];

  if (findClient) {
    if (!bcryptjs.compareSync(password, findClient.Password)) {
      return res.status(404).json({
        msg: "El password no esta relacionado con la información de nuestros usuarios",
      });
    }

    generateJWT(findClient.Id_CUSTOMERS.toString()).then((token) => {
      const {
        state,
        Password,
        birthdate,
        Id_people,
        f_name,
        s_name,
        f_lastname,
        s_lastname,
        ...resto
      } = findClient;

      const userName = `${f_name} ${s_name} ${f_lastname} ${s_lastname}`;

      return res.json({ ...resto, token, userName, role: "CLIENT" });
    });
  } else {
    return res.status(404).json("No se encontro nigun usuario con estos datos");
  }
};

/**
 * Function for do login
 */
export const login = async (req = request, res = response) => {
  const { password, email } = req.body;

  makeQuery(
    "SELECT * FROM sellers as se JOIN people as pe where se.Id_sellers = pe.Id_people;"
  )
    .then((results: Array<SellerResponseEntity>) => {
      searchSeller(req, res, results, email, password);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

/**
 * Funciton for make a new user
 */
export const newUser = async (req = request, res = response) => {
  const {
    firstName,
    secondName,
    surname,
    secondSurname,
    phoneNumber,
    email,
    birthDate,
    password,
    role,
  } = req.body;

  const id = "2";

  const token = await generateJWT(id);

  const salt = bcryptjs.genSaltSync();
  const passwordModificated = bcryptjs.hashSync(password, salt as any);

  res.json({
    id,
    fullName: `${firstName} ${secondName} ${surname} ${secondSurname}`,
    role,
    token,
  });
};

/**
 * Function for hide a user
 */
export const deleteUser = (req = request, res = response) => {
  const { id } = req.params;

  res.json({ id });
};

/**
 * Update user
 */
export const updateUser = (req = request, res = response) => {
  const { id } = req.params;

  res.json({ id });
};
