import mongoose from "mongoose";
const Category = mongoose.model("Category");

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name: String,
    description: String,
    cantidad: Number,
    category: {
        type: Schema.ObjectId,
        ref: "Category"
    }
})

export default mongoose.model("Product", ProductSchema);