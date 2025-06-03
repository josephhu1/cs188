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
        },
        source: {
            type: String,
            required: true,
        },
        options: {
            type: [String],
            required: false,    // option, only required for multiple choice problems
        }
    },
    {
        timestamps: true,
    }
);

export const Problem = mongoose.model('Problem', problemSchema);
