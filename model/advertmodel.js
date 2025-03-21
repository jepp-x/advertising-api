import { Schema, Types } from "mongoose";



// advert schemas
const advertSchema = new Schema({
    name: {type: String, required: true, unique: true},
    price: {type: String, required: true},
    pictures: {type: String, required: true},
    description: {type: String, required: true},
    quantity: {type: String, required: true},
    userId: {type: Types.ObjectId, required: true, ref: "User"}
}, {
    timestamps: true
});

// add schma to record deletion actions performed
export const AdvertModel = model("Advert", advertSchema);