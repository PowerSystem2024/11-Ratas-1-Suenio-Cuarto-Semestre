import jwt from "jsonwebtoken";

const createAccessToken = (paylod) => {
  return new Promise((resolve, reject) => {
    jwt.sign(paylod, "xyz123", { expiresIn: "1d" }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

const verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "xyz123", (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
}


export {
  createAccessToken,
  verifyAccessToken
};