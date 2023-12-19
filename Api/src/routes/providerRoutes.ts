import { Router } from 'express';
import providerController from '../controllers/provider.controller';
import { checkJwt } from '../middleware/jwt.js';


class ProviderRoutes{
    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/getAll/', [checkJwt], providerController.getAll);
        this.router.get('/getOne/:id', [checkJwt], providerController.getOne);
        this.router.post('/', [checkJwt], providerController.create);
        this.router.put('/update/:id', [checkJwt], providerController.update);
    }
}

const providerRoutes = new ProviderRoutes();
export default providerRoutes.router;