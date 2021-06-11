import mongoose from "mongoose";

const { Schema } = mongoose;
const UserSchema = new Schema({
    name: String,
    lastname: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

export default mongoose.model("User", UserSchema);