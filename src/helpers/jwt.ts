import jwt from "jsonwebtoken";

const generateJWT = (id: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid: id };

    jwt.sign(
      payload,
      process.env.SECRET_KEY as any,
      { expiresIn: "5h" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
};

export default generateJWT;
