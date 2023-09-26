import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import envConfig from "../src/config/env.config.js";

const connection = mongoose.connect(envConfig.mongoUrlTest);

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Test session', () => {
    describe('Test user', () => {
        let cookie;
        it('POST /api/session/register registro de nuevo usuario', async () => {
            const newUser = {
                first_name: "pruebita",
                last_name: "pruebasa",
                email: "preuba5@gmail.com",
                age: 23,
                cart: "6490d7842ece9f009f7be897",
                role: "admin",
                password: "$2b$10$HZonrAmEPBeIlLu/uE3h3e04HHJeHWcsBK0X6m2mo.scWFNJJHVG2"
            };
            const {statusCode, ok, _body} = await requester.post("/api/session/register").send(newUser);
            expect(_body.status).to.be.equal('success');
        }).timeout(1000)

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
        }).timeout(1000)

        it('POST /api/session/login logueo de un usuario', async () => {
            const user = {
                email: "l_usqueda@hotmail.com",
                password: "12345"
            }
            const result = await requester
                .post("/api/session/login")
                .send(user);
            const cookieResult = result.headers['set-cookie'][0];   
            expect(cookieResult).to.be.ok;
            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1],
            }
        }).timeout(1000)

        it('GET /api/session/current datos de un usuario logueado', async () => {
            const result = await requester
                .get("/api/session/current")
                .set("Cookie",[`${cookie.name}=${cookie.value}`]);
            expect(result.body.email).to.be.ok;
        }).timeout(1000)
    })
})