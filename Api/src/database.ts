import mysql from 'promise-mysql';

import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log('DB Fresco is connected');
    }).catch(function(e) {
        console.log('Error: ', e);
        throw e;
    })
    ;

export default pool;