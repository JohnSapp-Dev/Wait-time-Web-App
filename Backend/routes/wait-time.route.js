import { Router } from 'express';
import {getAllParkData, getLandData, getParkData, getSingleRideData} from "../controllers/wait-time.controller.js";

const router = Router();

router.route("/GetData").get(getSingleRideData);
// router.route("/GetLandData").get(getLandData);
// router.route("/GetParkData").get(getParkData);

router.route("/GetLandData").get(getLandData);
router.route("/GetParkData").get(getParkData);

router.route("/GetAllParks").get(getAllParkData);

export default router;