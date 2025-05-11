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
          }
    },
    {
        timestamps: true,
    }
)
export const User = mongoose.model('User', userInfo);