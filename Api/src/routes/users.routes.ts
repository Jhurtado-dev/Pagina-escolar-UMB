import { Router } from 'express';
import usersController from '../controllers/users.controller';
import { checkJwt } from '../middleware/jwt'

class UsersRoutes{
    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/getAll/', [checkJwt], usersController.getAll);
        this.router.get('/getOne/:id', usersController.getOne);
        this.router.post('/create', [checkJwt], usersController.create);
        this.router.put('/update/:id', [checkJwt], usersController.update);
        this.router.get('/signin/:email&:password', usersController.signIn);
        this.router.get('/getUserPlants/:email', usersController.getUserPlants);
        this.router.post('/create/userPlant', [checkJwt], usersController.createUserPlant);
        this.router.put('/update/userPlant/:idUser', [checkJwt], usersController.updateUserPlant);

    }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;