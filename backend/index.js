import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Problem } from "./models/problemModel.js";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
    console.log(request)
    return response.status(234).send("Message")

});

app.listen(PORT, () => {
    console.log(`App is on: ${PORT}`);
});


// Save new problem
app.post("/problems", async (request, response) => {
    try {
        if (
            !request.body.image ||
            !request.body.tag ||
            !request.body.answer
        ) {
            return response.status(400).send({
                message: "Send all fields"
            });
        }
        const newProblem = {
            image: request.body.image,
            tag: request.body.tag,
            answer: request.body.answer
        };

        const problem = await Problem.create(newProblem);

        return response.status(201).send(problem)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
    }
});

// Get all problems
app.get("/problems", async (request, response) => {
    try {
        const problems = await Problem.find({});

        return response.status(200).json({
            count: problems.length,
            data: problems
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});


// Get problems from tag
app.get("/problems/:tag", async (request, response) => {
    try {

        const {tag} = request.params;
        const problems = await Problem.find({ tag: tag});

        return response.status(200).json({
            count: problems.length,
            data: problems
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// Get one random problem from tag
app.get("/problems/random/:tag", async (request, response) => {
    try {

        const {tag} = request.params;
        const problems = await Problem.aggregate([
            { $match: {tag: tag}},
            { $sample: {size: 1}}
        ]);
        return response.status(200).json(problems[0]);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});


mongoose 
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connected to db");
    })
    .catch((error) => {
        console.log(error);
    })