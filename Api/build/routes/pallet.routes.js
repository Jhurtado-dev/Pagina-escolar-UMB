"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("../middleware/jwt");
const pallet_controller_1 = __importDefault(require("../controllers/pallet.controller"));
class PalletRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/getPallets/:date', [jwt_1.checkJwt], pallet_controller_1.default.getPallet);
        this.router.post('/createPallet', [jwt_1.checkJwt], pallet_controller_1.default.createPallet);
    }
}
const palletRoutes = new PalletRoutes();
exports.default = palletRoutes.router;
