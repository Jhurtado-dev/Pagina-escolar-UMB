"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const jwt_1 = require("../middleware/jwt");
class TransporRutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/getAll/:plantId', [checkJwt], usersController.getAll);
        this.router.get('/getOne/:id', usersController.getOne);
        this.router.post('/create', [checkJwt], usersController.create);
        this.router.put('/update/:id', [checkJwt], usersController.update);
        this.router.get('/signin/:email&:password', usersController.signIn);
        this.router.get('/getUserPlants/:email', usersController.getUserPlants);
        this.router.post('/create/userPlant', [jwt_1.checkJwt], users_controller_1.default.createUserPlant);
        /*  this.router.put('/update/userPlant/:idUser', [checkJwt], usersController.updateUserPlant); */
    }
}
const usersRoutes = new TransporRutes();
exports.default = usersRoutes.router;
