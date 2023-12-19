import { Router } from 'express';
import shipmentController from '../controllers/shipment.controller';
import { checkJwt } from '../middleware/jwt.js';


class ShipmentsRoutes{
    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/getPlants/', shipmentController.getPlants);
        this.router.get('/getSku/', shipmentController.getSku);
        this.router.get('/getPallet/', shipmentController.getPallets);
        this.router.get('/getBoxes/', shipmentController.getBoxes);

        this.router.post('/createPallet', shipmentController.createPallet)
    }
}

const shipmentsRoutes = new ShipmentsRoutes();
export default shipmentsRoutes.router;