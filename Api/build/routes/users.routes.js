"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
class UsersRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/signin', users_controller_1.default.signIn);
        this.router.get('/student/info', users_controller_1.default.studentInfo);
        this.router.get('/student/schedule', users_controller_1.default.studentSchedule);
    }
}
const usersRoutes = new UsersRoutes();
exports.default = usersRoutes.router;
