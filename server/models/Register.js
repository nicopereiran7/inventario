import mongoose from "mongoose";
const Product = mongoose.model("Product");
const User = mongoose.model("User");
const Action = mongoose.model("Action");

const { Schema } = mongoose;
const RegisterSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    product: {
        type: Schema.ObjectId,
        ref: "Product"
    },
    productName: String,
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    action: {
        type: Schema.ObjectId,
        ref: "Action"
    },
    stock: Number
})

export default mongoose.model("Register", RegisterSchema);