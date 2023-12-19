"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transport_controller_1 = __importDefault(require("../controllers/transport.controller"));
const jwt_1 = require("../middleware/jwt");
class TransporRutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/getTransport', [jwt_1.checkJwt], transport_controller_1.default.getTransport);
        this.router.post('/createTransport', transport_controller_1.default.createTransport);
    }
}
const usersRoutes = new TransporRutes();
exports.default = usersRoutes.router;
