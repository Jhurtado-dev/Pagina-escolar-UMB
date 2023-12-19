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
    private pool: ConnectionPool;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.pool = new sql.ConnectionPool(keys.database);
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
        // Connect to the SQL Server before starting the server
        try {
            await this.pool.connect();
            console.log('DB School is connected');
        } catch (error) {
            console.error('Error connecting to the database:', error);
            process.exit(1);
        }

        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const api = new Api();
api.start();
