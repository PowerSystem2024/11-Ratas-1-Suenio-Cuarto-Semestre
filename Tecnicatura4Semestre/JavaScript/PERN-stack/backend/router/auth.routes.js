import { Router } from "express";
import { signin, signout, signup, profile } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { signupSchema, signinSchema } from "../schemas/auth.schema.js";

const router = Router();

/*
Rutas de autenticación. Solo se permite el acceso a /profile si el usuario está autenticado.
Mientras que signup y signin validan los datos de entrada con los esquemas definidos.
*/
router.post("/signup", validateSchema(signupSchema), signup);
router.post("/signin", validateSchema(signinSchema), signin);
router.post("/signout", signout);
router.get("/profile", isAuthenticated, profile);

export default router;