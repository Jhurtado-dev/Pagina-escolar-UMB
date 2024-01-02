"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const transport_routes_1 = __importDefault(require("./routes/transport.routes"));
const pallet_routes_1 = __importDefault(require("./routes/pallet.routes"));
const shipments_routes_1 = __importDefault(require("./routes/shipments.routes"));
const drivers_routes_1 = __importDefault(require("./routes/drivers.routes"));
class Api {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/users', users_routes_1.default);
        this.app.use('/api/transport', transport_routes_1.default);
        this.app.use('/api/pallet', pallet_routes_1.default);
        this.app.use('/api/shipments', shipments_routes_1.default);
        this.app.use('/api/drivers', drivers_routes_1.default);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.listen(this.app.get('port'), () => {
                console.log('Server on port', this.app.get('port'));
            });
        });
    }
}
const api = new Api();
api.start();
