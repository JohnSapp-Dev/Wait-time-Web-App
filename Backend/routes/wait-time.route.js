import { Router } from 'express';
import { getWaitTime } from "../controllers/wait-time.controller.js";

const router = Router();

router.route("/GetData").post(getWaitTime);

export default router;