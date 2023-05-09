// Packages
import { request, response } from "express";
import bcryptjs from "bcryptjs";

import { makeQuery } from "../db/config";

// Interfaces
import { Person } from "../data/person.entity";

// Helpers
import generateJWT from "../helpers/jwt";

/**
 * Function for do login
 */
export const login = async (req = request, res = response) => {
  const { password, email } = req.body;

  makeQuery(`SELECT * FROM people WHERE email = '${email}'`)
    .then((results: Array<Person>) => {
      if (results.length > 0) {
        const data = results[0];
        if (!bcryptjs.compareSync(password, data.password || "")) {
          return res.status(404).json({
            msg: "El password no esta relacionado con la información de nuestros usuarios",
          });
        }

        generateJWT(data.Id_people.toString()).then((token) => {
          const {
            state,
            password,
            birthdate,
            f_name,
            s_name,
            f_lastname,
            s_lastname,
            Id_people,
            rol,
            ...resto
          } = data;

          const userName = `${f_name} ${s_name} ${f_lastname} ${s_lastname}`;
          return res.json({
            ...resto,
            token,
            userName,
            id: Id_people,
            role: data.rol,
          });
        });
      } else {
        return res.json(404).json("No existe un usuario con estos datos");
      }
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
