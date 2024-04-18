import { Router } from "express";
import handleCompute from "../controllers/compute/handleCompute";

const router = Router();

router.post("/compute", handleCompute);

export default router;
