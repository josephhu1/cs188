import express from "express"
import res from "express"
import { User } from "../models/userModel.js"
import mongoose from "mongoose"
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

// add points to user
router.post("/points/:username", async (request, response) => {
    try {

        const {username} = request.params;
        const user = await User.findOne({ username: username});
        user.points = user.points + 100
        await user.save()
        return response.status(200).json({message: "Added points successfully", user});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// increase streak user
router.post("/streak/:subject/:username", async (request, response) => {
    try {

        const {subject, username} = request.params;
        const user = await User.findOne({ username: username});
        const today = new Date()
        const stringToday = today.toLocaleDateString()
        switch (subject){
            case "ComSci":
                user.testing_streak = user.testing_streak + 1
                user.testing_date = stringToday
                break;
            case "Calculus":
                user.calculus_streak = user.calculus_streak + 1
                user.calculus_date = stringToday
                break;
            case "Biology":
                user.biology_streak = user.biology_streak + 1
                user.biology_data = stringToday
                break;
            case "Physics":
                user.physics_streak = user.physics_streak + 1
                user.physics_date = stringToday
                break;
        }
        await user.save()
        return response.status(200).json({message: "Added streak successfully", user});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// reset streak
router.post("/streak_reset/:subject/:username", async (request, response) => {
    try {

        const {subject, username} = request.params;
        const user = await User.findOne({ username: username});
        switch (subject){
            case "Testing":
                user.testing_streak = 0
                break;
            case "Calculus":
                user.calculus_streak = 0
                break;
        }
        await user.save()
        return response.status(200).json({message: "Reset streak successfully", user});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// update user profile picture
router.post("/update-pfp/:username", async (request, response) => {
    try {
        const { username } = request.params;
        const { pfp } = request.body;
        
        if (!pfp) {
            throw Error("Profile picture URL is required")
        }

        const user = await User.findOne({ username: username });
        
        if (!user) {
            throw Error("User not found")
        }
        
        // Update the user's profile picture
        user.pfp = pfp;
        
        // Add to inventory if not already there
        if (!user.inventory_pfp.includes(pfp)) {
            user.inventory_pfp.push(pfp);
        }
        
        await user.save();
        
        return response.status(200).json({
            message: "Profile picture updated successfully", 
            user
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// Unlock an avatar and deduct points
router.post("/unlock-avatar/:username", async (request, response) => {
  try {
    const { username } = request.params;
    const { avatarId } = request.body;

    if (!avatarId) {
      return response.status(400).json({ message: "Missing avatarId" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    // Avoid duplicates
    if (!user.inventory_pfp.includes(avatarId)) {
      user.inventory_pfp.push(avatarId);
    }

    // Deduct 100 points if possible
    if (user.points >= 100) {
      user.points -= 100;
    } else {
      return response.status(400).json({ message: "Not enough points" });
    }

    await user.save();

    return response.status(200).json({
      message: "Avatar unlocked and points deducted",
      user
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get avatar collection
router.get("/avatars", async (request, response) => {
    try {
        // List of avatar URLs
        const avatars = [
            "https://img.buzzfeed.com/buzzfeed-static/static/2016-05/19/11/enhanced/buzzfeed-prod-web12/enhanced-14306-1463672213-1.png",
            "https://upload.wikimedia.org/wikipedia/commons/e/e3/Tory_Lanez_2500x1669.jpg",
            "https://www.refinery29.com/images/11174427.jpg?format=webp&width=720&height=864&quality=85",
            "https://upload.wikimedia.org/wikipedia/commons/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
            "https://m.media-amazon.com/images/M/MV5BNWI4ZTJiZmUtZGI5MC00NTk4LTk2OTYtNDU3NTJiM2QxNzM0XkEyXkFqcGc@._V1_.jpg",
            "https://media.cnn.com/api/v1/images/stellar/prod/elon-musk-qatar-economic-forum-0520.jpg"
        ];
        
        return response.status(200).json(avatars);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

router.get('/users', async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 }).limit(10);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;