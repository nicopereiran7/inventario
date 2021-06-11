import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ActionSchema = new Schema({
    name: String
})
// borrar - crear - eliminar acciones

export default mongoose.model("Action", ActionSchema);