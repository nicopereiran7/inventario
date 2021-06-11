import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

// IMPORTANDO RUTAS
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import actionRoutes from "./routes/action.js";
import userRoutes from "./routes/user.js";
import registerRoutes from "./routes/register.js";

// CONSTANTES
const app = express();
const PORT_SERVER = process.env.PORT_SERVER || 3001;
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env;
const CONNECTION_DB = NODE_ENV === "test" ? MONGO_DB_URI_TEST : MONGO_DB_URI;

// SETTHINGS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// CONEXION A MONGODB
mongoose.connect(CONNECTION_DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`CONECTADO A MONGO DB`);
}).catch(err => {
    console.log(err);
})
    
// ROUTES
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/action', actionRoutes);
app.use('/api/user', userRoutes);
app.use('/api/register', registerRoutes);


// SERVER EXPRESS
export const server = app.listen(PORT_SERVER, () => {
    console.log(`Server en http://localhost:${PORT_SERVER}/api | ${NODE_ENV}`);
})

export default app;
