import { Router } from "express";
import {
  listarTareas,
  listarTarea,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
} from "../controllers/tareas.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { createTareaSchema, updateTareaSchema } from "../schemas/tareas.schema.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(isAuthenticated); // Todas las rutas de tareas requieren autenticación

router.get("/tareas", listarTareas);
router.get("/tareas/:id", listarTarea);
router.post("/tareas", validateSchema(createTareaSchema), crearTarea);
router.put("/tareas/:id", validateSchema(updateTareaSchema), actualizarTarea);
router.delete("/tareas/:id", eliminarTarea);

export default router;
