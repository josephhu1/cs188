import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const feedbackSchema = new mongoose.Schema({
  username: { type: String, required: false },
  problemId: { type: String, required: false },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// POST feedback
router.post("/", async (req, res) => {
  try {
    const { username, problemId, message } = req.body;
    if (!message) return res.status(400).json({ message: "Message required" });

    const feedback = await Feedback.create({ username, problemId, message });
    res.status(201).json({ message: "Feedback received!", feedback });
  } catch (err) {
    alert("Error sending feedback");
    console.error("❌ Feedback error:", err.response?.data || err.message);
  }
});

export default router;
