import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import md5 from "md5";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const resultEmail = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (resultEmail.rows.length === 0) {
      return res.status(401).json({ message: "Email no registrado" });
    }

    const user = resultEmail.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "La contraseña es incorrecta" });
    }

    const token = await createAccessToken({ id: user.id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        gravatar: user.gravatar,
        usuario_id: user.usuario_id,
      },
      message: "Inicio de sesión exitoso",
    });
    // res.json({ user: resultEmail.rows[0], message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error("Error en signin:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const signup = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const gravatar = "https://www.gravatar.com/avatar/" + md5(email);

    const resultado = await pool.query(
      "INSERT INTO usuarios (nombre, email, password, gravatar) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, email, hashedPassword, gravatar]
    );
    const token = await createAccessToken({ id: resultado.rows[0].id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ user: resultado.rows[0] });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "El email ya está en uso" });
    }
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const signout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Cierre de sesión exitoso" });
};

export const profile = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, nombre, email, gravatar, fecha_registro, fecha_actualizacion FROM usuarios WHERE id = $1",
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = result.rows[0];
    console.log("ID del usuario autenticado:", req.userId);

    res.status(200).json({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      gravatar: user.gravatar,
      fecha_registro: user.fecha_registro,
      fecha_actualizacion: user.fecha_actualizacion,
    });
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
