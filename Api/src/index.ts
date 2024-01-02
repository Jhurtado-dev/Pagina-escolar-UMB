import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import sql, { ConnectionPool } from 'mssql'; // Update this line
import keys from './keys';

import usersRoutes from './routes/users.routes';
import transportRoutes from './routes/transport.routes';
import palletRoutes from './routes/pallet.routes';
import shipmentsRoutes from './routes/shipments.routes';
import driversRoutes from './routes/drivers.routes';

class Api {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {
        this.app.use('/api/users', usersRoutes);
        this.app.use('/api/transport', transportRoutes);
        this.app.use('/api/pallet', palletRoutes);
        this.app.use('/api/shipments', shipmentsRoutes);
        this.app.use('/api/drivers', driversRoutes);
    }

    async start(): Promise<void> {
   
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const api = new Api();
api.start();
