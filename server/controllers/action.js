import Action from "../models/Action.js";

export const createAction = (req, res) => {
    const { name } = req.body;
    const action = new Action();
    action.name = name;

    if(!name) {
        res.status(404).send({ message: "Todos los campos son obligatorios" });
    }else {
        Action.findOne({ name: name }, (err, result) => {
            if(err) {
                res.status(500).send({ message: "Error en el Servidor" });
            }else {
                if(result) {
                    res.status(404).send({ message: `La accion ${name} ya existe` });
                }else {
                    action.save((err, actionStored) => {
                        if(err) {
                            res.status(500).send({ message: "Error en el Servidor" });
                        }else {
                            if(!actionStored) {
                                res.status(404).send({ message: "Error al crear la accion" });
                            }else {
                                res.status(200).json({ actionStored })
                            }
                        }
                    });
                }
            }
        })
        
    }
}

export const getActions = (req, res) => {
    Action.find({}, (err, actions) => {
        if(err) {
            res.status(500).send({ message: "Error en el Servidor" });
        }else {
            if(!actions) {
                res.status(404).send({ message: "No hay acciones disponibles" });
            }else {
                res.status(200).json({ actions: actions });
            }
        }
    })
}

