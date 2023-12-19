"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("../middleware/jwt");
const drivers_controller_1 = __importDefault(require("../controllers/drivers.controller"));
class DriversRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/getDrivers/', [jwt_1.checkJwt], drivers_controller_1.default.getDrivers);
    }
}
const dirversRoutes = new DriversRoutes();
exports.default = dirversRoutes.router;
