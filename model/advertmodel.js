import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose"



// advert schemas
const advertSchema = new Schema({
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    // pictures: [{type: String, required: true}],
    description: {type: String, required: true},
    quantity: {type: Number, required: true},
    // userId: {type: Types.ObjectId, required: true, ref: "User"},
    isDeleted: { type: Boolean, default: false},
    deletedAt: { type: Date, default: null}
}, {
    timestamps: true
});

advertSchema.plugin(normalize);

// add schma to record deletion actions performed
export const AdvertModel = model("Advert", advertSchema);