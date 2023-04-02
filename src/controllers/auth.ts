// Packages
import { request, response } from "express";
import bcryptjs from "bcryptjs";

// Data
import { clients, sellers } from "../helpers/data";
import { Client, Seller } from "../data/models";

// Helpers
import generateJWT from "../helpers/jwt";

/**
 * Function for do login
 */
export const login = async (req = request, res = response) => {
  const { password, email } = req.body;

  let user: Client | Seller | any;
  let isUser: boolean = false;

  const findClient = clients.filter((client) => client.email === email)[0];

  if (!findClient) {
    const findSeller = sellers.filter((seller) => seller.email === email)[0];

    if (!findSeller) {
      return res
        .status(404)
        .json({ msg: "No se encontro ningun usuario con estas credenciales" });
    }

    user = findSeller;
    if (!bcryptjs.compareSync(password as any, findSeller.password)) {
      return res.status(404).json({
        msg: "El password no esta relacionado con la información de nuestros usuarios",
      });
    }
  }

  if (
    findClient &&
    !bcryptjs.compareSync(password as any, findClient.password)
  ) {
    return res.status(404).json({
      msg: "El password no esta relacionado con la información de nuestros usuarios",
    });
  }

  if (findClient) {
    isUser = true;
    user = findClient;
  }

  const token = await generateJWT(user.id);

  const { password: p, birthDate, ...resto } = user;

  res.json({ resto, role: isUser ? "CLIENT" : "SELLER", token });
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
    address,
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
