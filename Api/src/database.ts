import sql, { ConnectionPool } from 'mssql';
import keys from './keys';

const pool = new ConnectionPool(keys.database);

pool.connect()
    .then(() => {
        console.log('DB School is connected');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    });

export default pool;
