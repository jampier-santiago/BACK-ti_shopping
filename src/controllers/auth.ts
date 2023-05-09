// Packages
import { request, response } from "express";
import bcryptjs from "bcryptjs";

import { makeQuery } from "../db/config";

// Interfaces
import { Person } from "../data/person.entity";

// Helpers
import generateJWT from "../helpers/jwt";

/**
 * Function for get all clients
 */
export const getAllUsers = (req = request, res = response) => {
  makeQuery(`SELECT * FROM people WHERE state = '1'`)
    .then((results: Array<Person>) => {
      return res.json(results);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

/**
 * Function for do login
 */
export const login = async (req = request, res = response) => {
  const { password, email } = req.body;

  makeQuery(`SELECT * FROM people WHERE email = '${email}' AND state = '1'`)
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
    address,
    birthDate,
    password,
    N_credit_card,
    credit_card_expiration_date,
    CVC,
  } = req.body;

  const salt = bcryptjs.genSaltSync();
  const passwordModificated = bcryptjs.hashSync(password, salt as any);

  const date = new Date();

  makeQuery("INSERT INTO people SET ?", {
    state: 1,
    email: email,
    birthdate: birthDate,
    f_name: firstName.toLowerCase(),
    s_name: secondName.toLowerCase(),
    f_lastname: surname.toLowerCase(),
    s_lastname: secondSurname.toLowerCase(),
    num_telephone: phoneNumber,
    address: address.toLowerCase(),
    creation_date: `${
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    }/${
      date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
    }/${date.getFullYear()}`,
    password: passwordModificated,
    N_credit_card,
    CVC,
    credit_card_expiration_date,
    rol: "CLIENT",
  })
    .then(() => response.status(200).json("Elemento insertado con exito"))
    .catch((error) => res.status(500).json(error));
};

/**
 * Function for hide a user
 */
export const deleteUser = (req = request, res = response) => {
  const { id } = req.params;

  makeQuery(`SELECT * FROM people WHERE Id_people = '${id}'`)
    .then((results: Array<Person>) => {
      if (results.length > 0) {
        makeQuery(`UPDATE people SET state = '0' WHERE Id_people = '${id}'; `)
          .then(() => res.json("Elemento eliminado con exito"))
          .catch((error) => res.status(500).json(error));
      } else {
        return res.json(404).json("No existe un usuario con estos datos");
      }
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

/**
 *
 *  Function for active a some user
 */
export const activeUser = (req = request, res = response) => {
  const { id } = req.params;

  makeQuery(`SELECT * FROM people WHERE Id_people = '${id}'`)
    .then((results: Array<Person>) => {
      if (results.length > 0) {
        makeQuery(`UPDATE people SET state = '1' WHERE Id_people = '${id}'; `)
          .then(() => res.json("Elemento eliminado con exito"))
          .catch((error) => res.status(500).json(error));
      } else {
        return res.json(404).json("No existe un usuario con estos datos");
      }
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

/**
 * Update user
 */
export const updateUser = (req = request, res = response) => {
  const { id } = req.params;

  const {
    firstName,
    secondName,
    surname,
    secondSurname,
    phoneNumber,
    email,
    address,
    N_credit_card,
    credit_card_expiration_date,
    CVC,
  } = req.body;

  const data: any = {
    f_name: firstName,
    s_name: secondName,
    f_lastname: surname,
    s_lastname: secondSurname,
    num_telephone: phoneNumber,
    email: email,
    address: address,
    N_credit_card: N_credit_card,
    credit_card_expiration_date: credit_card_expiration_date,
    CVC: CVC,
  };

  let query = "";

  Object.keys(data).forEach((brand) => {
    if (data[brand]) {
      query += `${brand} = '${data[brand]}', `;
    }
  });

  query = query.slice(0, -2) + query.slice(-1);

  makeQuery(`SELECT * FROM people WHERE Id_people = '${id}'`)
    .then((results: Array<Person>) => {
      if (results.length > 0) {
        makeQuery(
          `UPDATE people SET ${query.trim()} WHERE Id_people = '${id}';`
        )
          .then(() => res.json("Elemento actualizado con exito"))
          .catch((error) => res.status(500).json(error));
      } else {
        return res.json(404).json("No existe un usuario con estos datos");
      }
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};
