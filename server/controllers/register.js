import Register from "../models/Register.js";
import User from "../models/User.js";
import Product from "../models/Register.js";
import Action from "../models/Action.js";

export const createRegister = (req, res) => {
    const { user, product, productName, action, stock } = req.body;
    const register = new Register();
    register.user = user;
    register.product = product;
    register.productName = productName;
    register.action = action;
    register.stock = stock

    if(!user || !product || !action) {
        res.status(404).send({ message: "Todos los campos son obligatorios" });
    }else {
        User.findById(user, (err, result) => {
            if(err) {
                res.status(500).send({ message: "Error en el Servidor" });
            }else {
                if(!result) {
                    res.status(404).send({ message: "El usuario no esta registrado en la base de datos" });
                }else {
                    register.save((err, registerStored) => {
                        if(err) {
                            res.status(500).send({ message: "Error en el Servidor" });
                        }else {
                            if(!registerStored) {
                                res.status(404).send({ message: "Error al crear Registro" });
                            }else {
                                res.status(200).send({ register: registerStored });
                            }
                        }
                    })
                }
            }
        });
    }
}

export const getRegisters = (req, res) => {
    Register.find({}, null, { sort: { date: -1 } }, (err, registers) => {
        if(err) {
            res.status(500).send({ message: "Error en el Servidor" });
        }else {
            if(!registers) {
                res.status(404).send({ message: "No se encuentran registros" });
            }else {
                User.populate(registers, { path: "user" }, (err, registers) => {
                    if(err) {
                        res.status(500).send({ message: "Error en el User" });
                    }
                    Product.populate(registers, { path: "product" }, (err, registers) => {
                        if(err) {
                            res.status(500).send({ message: "Error en Product" });
                        }
                        Action.populate(registers, { path: "action" }, (err, registers) => {
                            if(err) {
                                res.status(500).send({ message: "Error en Action" });
                            }else {
                                res.status(200).send({ registers });
                            }
                        })
                    })
                })
            }
        }
    })
}