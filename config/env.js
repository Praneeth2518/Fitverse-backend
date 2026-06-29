import dotenv from 'dotenv';

dotenv.config({path: `.env.development.local`});

export const {
    PORT,
    DB_URI,
    JWT_SECRET,
    ADMIN_KEY,
    JWT_EXPIRES_IN
} = process.env;