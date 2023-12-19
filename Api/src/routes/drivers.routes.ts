import { Router } from "express";
import { checkJwt } from "../middleware/jwt";
import  driversController  from "../controllers/drivers.controller";


class DriversRoutes {
    public router : Router = Router();
    constructor() {
        this.config();
    }

    config(): void{
        this.router.get('/getDrivers/', [checkJwt], driversController.getDrivers)
    }
}


const dirversRoutes = new DriversRoutes();
export default dirversRoutes.router;