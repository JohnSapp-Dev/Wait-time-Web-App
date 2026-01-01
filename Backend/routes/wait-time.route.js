import { Router } from 'express';
import {getLandData, getParkData, getSingleRideData} from "../controllers/wait-time.controller.js";

const router = Router();

router.route("/GetData").post(getSingleRideData);
router.route("/GetLandData").get(getLandData);
router.route("/GetParkData").get(getParkData);

export default router;