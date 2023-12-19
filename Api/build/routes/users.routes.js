"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const jwt_1 = require("../middleware/jwt");
class UsersRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/getAll/', [jwt_1.checkJwt], users_controller_1.default.getAll);
        this.router.get('/getOne/:id', users_controller_1.default.getOne);
        this.router.post('/create', [jwt_1.checkJwt], users_controller_1.default.create);
        this.router.put('/update/:id', [jwt_1.checkJwt], users_controller_1.default.update);
        this.router.get('/signin/:email&:password', users_controller_1.default.signIn);
        this.router.get('/getUserPlants/:email', users_controller_1.default.getUserPlants);
        this.router.post('/create/userPlant', [jwt_1.checkJwt], users_controller_1.default.createUserPlant);
        this.router.put('/update/userPlant/:idUser', [jwt_1.checkJwt], users_controller_1.default.updateUserPlant);
    }
}
const usersRoutes = new UsersRoutes();
exports.default = usersRoutes.router;
