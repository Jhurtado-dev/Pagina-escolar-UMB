"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("../middleware/jwt");
class PalletRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/pallets', [jwt_1.checkJwt]);
    }
}
const palletRoutes = new PalletRoutes();
exports.default = palletRoutes.router;
