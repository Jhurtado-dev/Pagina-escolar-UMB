import { Router } from 'express';
import transportController from '../controllers/transport.controller';
import { checkJwt } from '../middleware/jwt'

class TransporRutes{
    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/getTransport',[checkJwt],transportController.getTransport);
        this.router.post('/createTransport', transportController.createTransport);

    }
}

const usersRoutes = new TransporRutes();
export default usersRoutes.router;