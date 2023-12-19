export default {
    database: {
        server: '192.168.56.1',
        user: 'sa',
        password: 'Adastra2023',
        database: 'ctrl_school_db',
        options: {
            // Additional options if needed
            encrypt: true, // For Microsoft Azure
            trustServerCertificate: true, // For local development
        },
    },
};
