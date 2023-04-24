import mysql from "mysql";
export let connection: mysql.Pool;

export const makePool = async () => {
  connection = mysql.createPool({
    host: "34.68.24.69",
    database: "bd",
    user: "root",
    password: "back_proj3ct03-19@HJLJ",
    port: 3030,
  });
};

export const makeQuery = (query: string) => {
  return connection.query(query);
};
