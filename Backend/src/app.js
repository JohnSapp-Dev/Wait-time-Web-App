import express from "express"

import cors from "cors";
const app = express();

app.use(express.json());

const allowedOrigins = ['http://localhost:63342']

app.use(cors({origin: allowedOrigins}));

//routes import
import waitTimeRoute from "../routes/wait-time.route.js";

//example route: http://localhost:4000/api/v1/waitTime/Get/id"
app.use("/api/v1/waitTime", waitTimeRoute);


// automate calls to queue-times.com API to gather wait time data


export default app;