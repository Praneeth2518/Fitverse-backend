import {DB_URI} from "../config/env.js";
import mongoose from "mongoose";

if(!DB_URI) {
    throw new Error("MongoDB URI doesn't exist");
}

export const connectToDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("MongoDB Connected");
    } catch(e) {
        console.error(e);
    }
}