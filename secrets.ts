import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const PORT = process.env.PORT;

export const DB_CONFIG = {
    server: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '1433'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
        encrypt: false, // Set to true if you need encryption
    }
};

export const JWT_SECRET = process.env.JWT_SECRET;