import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import envConfig from "../src/config/env.config.js";

const connection = mongoose.connect(envConfig.mongoUrlTest);

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Test session', () => {
    describe('Test register', () => {
        it('POST /api/session/register registro de nuevo usuario', async () => {
            const newUser = {
                first_name: "pruebita",
                last_name: "pruebasa",
                email: "preuba1sadsa@gmail.com",
                age: 23,
                cart: "6490d7842ece9f009f7be897",
                role: "admin",
                password: "$2b$10$HZonrAmEPBeIlLu/uE3h3e04HHJeHWcsBK0X6m2mo.scWFNJJHVG2"
            };
            const {statusCode, ok, _body} = await requester.post("/api/session/register").send(newUser);
            console.log(statusCode, ok, _body);
            expect(_body.status).to.be.equal('success');
        })

        it('POST /api/session/register deber devolver 400 si no ingresa email', async () => {
            const newUser = {
                first_name: "pruebita",
                last_name: "pruebasa",
                age: 23,
                cart: "6490d7842ece9f009f7be897",
                role: "admin",
                password: "$2b$10$HZonrAmEPBeIlLu/uE3h3e04HHJeHWcsBK0X6m2mo.scWFNJJHVG2"
            }
            const {statusCode, ok, _body} = await requester.post("/api/session/register").send(newUser);
            expect(statusCode).to.be.equal(302);
        })

    })

    describe('Test1', () => {

    })

})