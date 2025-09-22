import { Router } from "express";
import { signin, signout, signup, porfile } from "../controllers/out.controller";

const router = Router();

router.post ("./signin", signin);

router.post ("./signup", signup);

router.post ("./signout", signout);

router.post ("./porfile", porfile);

export default router;
