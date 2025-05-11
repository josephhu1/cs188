import express from "express"
import { Problem } from "../models/problemModel.js"

const router = express.Router();

// Save new problem
router.post("/problems", async (request, response) => {
    try {
        if (
            !request.body.image ||
            !request.body.subject ||
            !request.body.tag ||
            !request.body.answer
        ) {
            return response.status(400).send({
                message: "Send all fields"
            });
        }
        const newProblem = {
            image: request.body.image,
            subject: request.body.subject,
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
router.get("/", async (request, response) => {
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
router.get("/:tag", async (request, response) => {
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
router.get("/random/:tag", async (request, response) => {
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

// Get all tags from a single subject
router.get("/tags/:subject", async (request, response) => {
    try {

        const {subject} = request.params;
        const tags = await Problem.aggregate([
            { $match: {subject: subject}},
            { $group: { _id: '$tag' }}
        ]);
        return response.status(200).json(tags.map(x => x._id));
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

export default router;