import mongoose, { model, Schema } from "mongoose";
import normalize from "normalize-mongoose"

// regular user and vendor schemas
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, requires: true },
    role: {
        type: String,
        enum: ['user', 'vendor'],
        default: 'user' // Set to default value if not specified. Check uservalidator/validator.js for more explaination.
    }
}, {
    timestamps: true
});

userSchema.plugin(normalize)

export const userModel = model("user", userSchema);