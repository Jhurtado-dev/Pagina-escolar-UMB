"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shipment_controller_1 = __importDefault(require("../controllers/shipment.controller"));
class ShipmentsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/getPlants/', shipment_controller_1.default.getPlants);
        this.router.get('/getSku/', shipment_controller_1.default.getSku);
        this.router.get('/getPallet/', shipment_controller_1.default.getPallets);
        this.router.get('/getBoxes/', shipment_controller_1.default.getBoxes);
        this.router.post('/createPallet', shipment_controller_1.default.createPallet);
    }
}
const shipmentsRoutes = new ShipmentsRoutes();
exports.default = shipmentsRoutes.router;
