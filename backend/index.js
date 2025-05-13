import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Problem } from "./models/problemModel.js";
import problemsRoute from "./routes/problemsRoute.js"
import cors from "cors"
import userRoute from "./routes/userRoute.js"

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (request, response) => {
    console.log(request)
    return response.status(234).send("Message")

});

app.use("/problems", problemsRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`App is on: ${PORT}`);
});


mongoose 
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connected to db");
    })
    .catch((error) => {
        console.log(error);
    })