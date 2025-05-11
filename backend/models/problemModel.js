import mongoose from "mongoose";

const problemSchema = mongoose.Schema(
    {
        // URL of the image
        image: {
            type: String,
            required: true,
        },
        // subject of the problem
        tag: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Problem = mongoose.model('Cat', problemSchema);
