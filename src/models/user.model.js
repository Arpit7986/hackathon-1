import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'review'
        }
    ]
});

export const User = mongoose.model("User", userSchema);