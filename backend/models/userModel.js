import mongoose from "mongoose";

const userInfo = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
          password: {
            type: String,
            required: true
          },
          points: {
            type: Number,
            default: 0,
          },
          testing_streak: {
            type: Number,
            default: 0,
          },
          testing_date: {
            type: String,
            default: "1/1/2000"
          },
          calculus_streak: {
            type: Number,
            default: 0,
          },
          calculus_date: {
            type: String,
            default: "1/1/2000"
          },
          pfp: {
            type: String,
            default: "https://asteriaproblems.s3.us-east-2.amazonaws.com/Default_pfp.jpg"
          },
          inventory_pfp : {
            type: [String],
            default: []
          }

    },
    {
        timestamps: true,
    }
)
export const User = mongoose.model('User', userInfo);