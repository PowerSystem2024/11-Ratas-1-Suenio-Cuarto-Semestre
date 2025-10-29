import express from "express";
import morgan from "morgan";
import tareasRouter from "./router/tareas.routes.js";
import authRoutes from "./router/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { pool } from "./db.js";
import { ORIGIN } from "./config.js";

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({  // Configuración de CORS - permitir solicitudes desde el frontend
  origin: ORIGIN, 
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req, res) => res.json({message: 'Bienvenidos a nuestro proyecto'}))
app.get("/api/ping", async (req, res) => {
  const result =  await pool.query("SELECT NOW()");
  res.json(result.rows);
});
app.use("/api", authRoutes);
app.use("/api", tareasRouter);


app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message
  });
});

export default app;

