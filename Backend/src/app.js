import express from "express"
import cookieParser from 'cookie-parser'

import cors from "cors";
const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['http://localhost:63342','http://localhost:5173']

app.use(cors({origin: allowedOrigins}));

//routes import
import waitTimeRoute from "../routes/wait-time.route.js";
import userRoute from "../routes/user.route.js";

//example route: http://localhost:4000/api/v1/waitTime/Get/id"
app.use("/api/v1/waitTime", waitTimeRoute);
app.use("/api/user", userRoute);


// automate calls to queue-times.com API to gather wait time data


export default app;