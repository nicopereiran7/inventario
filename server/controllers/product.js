import Product from "../models/Products.js";
import Category from "../models/Category.js";

export const createProduct = (req, res) => {
    const { name, description, cantidad, category } = req.body;
    const product = new Product();
    product.name = name;
    product.description = description;
    product.cantidad = cantidad;
    product.category = category;

    if(!name || !description || !cantidad || !category) {
        res.status(404).send({ message: "Todos los campos son obligatorios" });
    }else {
        Product.findOne({ name: name }, (err, result) => {
            if(err) {
                res.status(500).send({ message: "Error en el Servidor" });
            }else {
                if(result) {
                    res.status(404).send({ message: `El producto ${name} ya existe` });
                }else {
                    product.save((err, productStored) => {
                        if(err) {
                            res.status(500).send({ message: "Error en el Servidor" });
                        }else {
                            if(!productStored) {
                                res.status(404).send({ message: "Error al crear producto" });
                            }else {
                                res.status(200).send({ product: productStored });
                            }
                        }
                    })
                }
            }
        })
    }
}

export const getProducts = (req, res) => {
    Product.find({}, (err, products) => {
        if(err) {
            res.status(500).send({ message: "Error en el Servidor" });
        }else {
            if(!products) {
                res.status(404).send({ message: "Productos no encontrados" });
            }else {
                Category.populate(products, { path: "category" }, (err, products) => {
                    if(err) {
                        res.status(500).send({ message: "Error en el Servidor" });
                    }else {
                        res.status(200).send({ products });
                    }
                })
            }
        }
        
    })
}

export const updateProduct = (req, res) => {
    const productData = req.body;
    const params = req.params;

    Product.findByIdAndUpdate({ _id: params.id }, productData, (err, productUpdate) => {
        if(err) {
            res.status(500).send({ message: "Error en el Servidor" })
        }else {
            if(!productUpdate) {
                res.status(404).send({ message: "No se ha encontrado ningun producto" });
            }else {
                res.status(200).send({ product: productUpdate });
            }
        }
    })
}

export const deleteProduct = (req, res) => {
    const { id } = req.params;

    Product.findByIdAndRemove(id, (err, productDelete) => {
        if(err) {
            res.status(500).send({ message: "Error en el Servidor" });
        }else {
            if(!productDelete) {
                res.status(404).send({ message: "Prodcuto no encontrado" });
            }else {
                res.status(200).send({ message: "Producto Borrado Correctamente", product: productDelete });
            }
        }
    })
}

export const lastProduct = (req, res) => {
    Product.find({}, null, { sort: { $natural:-1 } }, (err, products) => {
        if(err) {
            res.status(500).send({ message: "Error en el Servidor" });
        }else {
            if(!products) {
                res.status(404).send({ message: "Productos no encontrados" });
            }else {
                Category.populate(products, { path: "category" }, (err, products) => {
                    if(err) {
                        res.status(500).send({ message: "Error en el Servidor" });
                    }else {
                        res.status(200).send({ products });
                    }
                })
            }
        }
        
    }).limit(1);
}