import express from "express"
import res from "express"
import { User } from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

const router = express.Router()
dotenv.config();

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_STRING, {expiresIn: '3d'})
}

router.post("/login", async (request, response) => {
    try {
        const { username, password } = request.body;
        if (!username || !password) {
            throw Error("Please fill out fields")
        }

        const user = await User.findOne({username})
        if (!user) {
            throw Error("Email not registered")
        }
        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            throw Error("Wrong password")
        }
        const token = createToken(user._id)


        response.status(200).json({username, token})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

router.post("/register", async (request, response) => {
    try {
        const { username, password } = request.body;
        if (!username || !password) {
            throw Error("Please fill out fields")
        }
        const exists = await User.findOne({username})

        if (exists) {
            throw Error("Username in use")
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        
        const user = await User.create({username, password: hash})
        const token = createToken(user._id)
        response.status(200).json({username, token})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// get user w/ username
router.get("/username/:username", async (request, response) => {
    try {

        const {username} = request.params;
        const user = await User.findOne({ username: username});

        return response.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});


export default router;