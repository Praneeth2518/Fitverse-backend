import ApiError from "../classes/ApiError.class.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";

export async function authMiddleware(req, res, next) {
    try {
        // req and token
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) {
            throw new ApiError(401, 'Unauthorized Access');
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if(!user || user.tokenVersion < decoded.tokenVersion) {
            throw new ApiError(401, 'Unauthorized Access');
        }

        req.user = user;
        next();
    } catch(e) {
        next(e);
    }
}