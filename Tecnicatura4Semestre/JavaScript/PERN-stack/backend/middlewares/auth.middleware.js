import jwt from 'jsonwebtoken';
import { verifyAccessToken } from '../libs/jwt.js';

export const isAuthenticated = async(req, res, next) => {
  //console.log("se envían cookies:", req.cookies); //Si devuelve undefined es que no se están enviando las cookies desde el cliente 

  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  try {
    const decoded = await verifyAccessToken(token);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Error en isAuthenticated:", error);
    return res.status(401).json({ message: 'Token inválido' });
  }
};
