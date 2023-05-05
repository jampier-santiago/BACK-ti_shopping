// Packages
import { request, response } from "express";
import bcryptjs from "bcryptjs";

import { makeQuery } from "../db/config";

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
        Id_people,
        Id_sellers,
        ...resto
      } = findClient;

      const userName = `${f_name} ${s_name} ${f_lastname} ${s_lastname}`;
      return res.json({
        ...resto,
        token,
        userName,
        id: Id_sellers,
        role: "SELLER",
      });
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
        Id_CUSTOMERS,
        ...resto
      } = findClient;

      const userName = `${f_name} ${s_name} ${f_lastname} ${s_lastname}`;

      return res.json({
        ...resto,
        token,
        userName,
        id: Id_people,
        role: "CLIENT",
      });
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

  const query = {
    customer: "INSERT INTO customers SET ?",
    seller: "INSERT INTO sellers SET ?",
  };

  const salt = bcryptjs.genSaltSync();
  const passwordModificated = bcryptjs.hashSync(password, salt as any);

  if (role === "SELLER_ROLE") {
    makeQuery(query.customer, {
      state: 1,
      email: email,
      Password: passwordModificated,
      birthdate: birthDate,
      f_name: firstName.toLowerCase(),
      s_name: secondName.toLowerCase(),
      f_lastname: surname.toLowerCase(),
      s_lastname: secondSurname.toLowerCase(),
      num_telephone: phoneNumber,
    }).then((results) => {
      return response.json(results);
    });
  }

  // const token = await generateJWT(id);
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
