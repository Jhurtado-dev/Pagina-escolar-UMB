"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = require("mssql");
const keys_1 = __importDefault(require("./keys"));
const pool = new mssql_1.ConnectionPool(keys_1.default.database);
pool.connect()
    .then(() => {
    console.log('DB School is connected');
})
    .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
});
exports.default = pool;
