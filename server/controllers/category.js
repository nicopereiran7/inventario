import Category from "../models/Category.js";

export const createCategory = (req, res) => {
    const { name } = req.body;
    const category = new Category();
    category.name = name;

    if(!name) {
        res.status(404).send({ message: "El nombre es obligatorio" });
    }else {
        Category.findOne({ name: name }, (err, result) => {
            if(err) {
                res.status(500).send({ message: "Error en el Servidor" });
            }else {
                if(result) {
                    res.status(404).send({ message: `La categoria ${name} ya existe` });
                }else {
                    category.save((err, categoryStored) => {
                        if(err) {
                            res.status(500).send({ message: "Error en el Servidor" });
                        }else {
                            if(!categoryStored) {
                                res.status(404).send({ messge: "Error al guardar Categoria" });
                            }else {
                                res.status(200).send({ category: categoryStored });
                            }
                        }
                    })
                }
            }
        })
    }
}

export const getCategories = (req, res) => {
    Category.find({}, (err, categories) => {
        if(err) {
            res.status(500).send({ message: "Error en el Servidor" });
        }else {
            if(!categories) {
                res.status(404).send({ message: "No hay categorias disponibles" });
            }else {
                res.status(200).send({ categories });
            }
        }
    })
}


