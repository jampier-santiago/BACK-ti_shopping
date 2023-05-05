import mysql from "mysql";
export let connection: mysql.Connection;

export const makePool = async () => {
  connection = mysql.createConnection({
    host: process.env.HOST_BD,
    user: process.env.USER_BD,
    password: process.env.PASSWORD_BD,
    database: process.env.DATABASE_BD,
    port: parseInt(process.env.PORT_BD as string),
    // ssl: { ca: fs.readFileSync("{ca-cert filename}") },
  });
};

export const makeQuery = (query: string, data?: any): Promise<any> => {
  return new Promise((resolve: any, reject) => {
    connection.query(query, data, (error: any, results) => {
      if (error) return reject(error);

      resolve(results);
    });
  });
};
