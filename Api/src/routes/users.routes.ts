import { Router } from 'express';
import usersController from '../controllers/users.controller';
import { checkJwt } from '../middleware/jwt'

class UsersRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/signin', usersController.signIn);
        this.router.get('/student/info', usersController.studentInfo,)
        this.router.get('/student/schedule', usersController.studentSchedule,)
    }
}


const usersRoutes = new UsersRoutes();
export default usersRoutes.router;