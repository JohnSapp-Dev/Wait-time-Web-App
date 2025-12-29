import express from "express"

const app = express();

app.use(express.json());

//routes import
import waitTimeRoute from "../routes/wait-time.route.js";

//example route: http://localhost:4000/api/v1/waitTime/Get/id"
app.use("/api/v1/waitTime", waitTimeRoute);

export default app;