"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const provider_controller_1 = __importDefault(require("../controllers/provider.controller"));
const jwt_js_1 = require("../middleware/jwt.js");
class ProviderRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/getAll/', [jwt_js_1.checkJwt], provider_controller_1.default.getAll);
        this.router.get('/getOne/:id', [jwt_js_1.checkJwt], provider_controller_1.default.getOne);
        this.router.post('/', [jwt_js_1.checkJwt], provider_controller_1.default.create);
        this.router.put('/update/:id', [jwt_js_1.checkJwt], provider_controller_1.default.update);
    }
}
const providerRoutes = new ProviderRoutes();
exports.default = providerRoutes.router;
