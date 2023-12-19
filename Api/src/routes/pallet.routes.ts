import { Router } from "express";
import { checkJwt } from "../middleware/jwt";
import  palletController  from "../controllers/pallet.controller";


class PalletRoutes {
    public router : Router = Router();
    constructor() {
        this.config();
    }

    config(): void{
        this.router.get('/getPallets/:date', [checkJwt], palletController.getPallet)

        this.router.post('/createPallet', [checkJwt], palletController.createPallet)
    }
}


const palletRoutes = new PalletRoutes();
export default palletRoutes.router;