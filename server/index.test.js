import app, { server } from "./index.js";
import request from "supertest";
import mongoose from "mongoose";

import Action from "./models/Action.js";

const initialActions = [
    { name: "Editado" },
    { name: "Eliminado" }
]

beforeEach(async (done) => {
    await Action.deleteMany({});
    
    const action1 = new Action(initialActions[0]);
    await action1.save();

    const action2 = new Action(initialActions[1]);
    await action2.save()

    done();
}) 

describe('Test rutas API', () => {
    test('metodo GET, obtener status /action/get-actions', (done) => {
        request(app).get("/api/action/get-actions")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            })
    })

    test('metodo GET, obtener status /category/get-categories', (done) => {
        request(app).get("/api/category/get-categories")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            })
    })

    test('metodo GET, obtener status /api/action/delete-action/ ruta que no existe', (done) => {
        request(app).delete("/api/action/delete-action")
            .then(response => {
                expect(response.statusCode).toBe(404);
                done();
            })
    })

    test('metodo GET, obtener el numero de acciones', async (done) => {
        const response = await request(app).get("/api/action/get-actions");
        expect(response.body.actions.length).toBe(initialActions.length);
        done();
    })

    test('metodo POST, crear una accion sin parametros', async (done) => {
        await request(app).post("/api/action/create-action").send({}).expect(404);
        const response = await request(app).get("/api/action/get-actions");
        expect(response.body.actions.length).toBe(initialActions.length);
        done();
    })

    test('metodo POST, crear una accion', async (done) => {
        const response = await request(app).post("/api/action/create-action").send({
            name: "Creado"
        })
        //buscar en la base de datos
        const action = await Action.findOne({ name: "Creado" });
        expect(JSON.stringify(response.body.actionStored)).toEqual(JSON.stringify(action));
        done();
    })
})

afterAll(() => {
    mongoose.connection.close();
    server.close();
})





