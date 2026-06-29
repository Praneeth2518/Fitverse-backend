import dotenv from 'dotenv';

dotenv.config({path: `.env.development.local`});

export const {
    PORT,
    DB_URI
} = process.env;