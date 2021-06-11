import User from "../models/User.js";
import Product from "../models/Products.js";
import bcrypt from "bcrypt-nodejs";
import { createAccessToken, createRefreshToken } from "../services/jwt.js";

export const signUp = (req, res) => {
    const user = new User();
    const { name, lastname, email, password, repeatPassword } = req.body;
    
    user.name = name;
    user.lastname = lastname;
    user.email = email;

    if(!password || !repeatPassword) {
        res.status(404).send({ message: "Las contraseñas son obligatorias" });
    }else {
        if(password !== repeatPassword) {
            res.status(404).send({ message: "Las contraseñas no coinciden" });
        }else {
            bcrypt.hash(password, null, null, (err, hash) => {
                if(err) {
                    res.status(500).send({ message: "Error al encriptar contraseña" });
                }else {
                    user.password = hash;
                    
                    user.save((err, userStored) => {
                        if(err) {
                            res.status(500).send({ message: "El correo ya esta registrado" });
                        }else {
                            if(!userStored) {
                                res.status(404).send({ message: "Error al crear usuaro" });
                            }else {
                                res.status(200).send({ user: userStored });
                            }
                        }
                    })
                }
            })          
        }
    }
}

export const signIn = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }, (err, userStored) => {
        if(err) {
            res.status(500).send({ message: "Error en el Servidor" });
        }else {
            if(!userStored) {
                res.status(404).send({ message: "Usuario No encontrado" })
            }else {
                bcrypt.compare(password, userStored.password, (err, check) => {
                    if(err) {
                        res.status(500).send({ message: "Error en el servidor" });
                    }else {
                        if(!check) {
                            res.status(404).send({ message: "Correo o Contraseña incorrecto" });
                        }else {
                            res.status(200).send({
                                accessToken: createAccessToken(userStored),
                                refreshToken: createRefreshToken(userStored)
                            })
                        }
                    }
                })
            }
        }
    })
}

export const getUsers = (req, res) => {
    User.find().then(users => {
        if(!users) {
            res.status(404).send({ message: "No se encuentran usuarios registrados" });
        }else {
            res.status(200).send({ users });
        }
    })
}

export const createProduct = (req, res) => {
    const { name, description, cantidad, category } = req.body;
    const product = new Product();

    product.name = name;
    product.description = description;
    product.cantidad = cantidad;
    product.category = category;

    product.save((err, productStored) => {
        if(err) {
            res.status(500).send({ message: "Error en el Servidor" });
        }else {
            if(!productStored) {
                res.status(404).send({ message: "Error al crear Producto" });
            }else {
                res.status(200).send({ product: productStored });
            }
        }
    })
}