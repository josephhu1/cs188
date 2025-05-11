import mongoose from "mongoose";

const problemSchema = mongoose.Schema(
    {
        // URL of the image
        image: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        // tag of the problem
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
