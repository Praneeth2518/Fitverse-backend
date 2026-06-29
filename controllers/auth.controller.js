import mongoose from 'mongoose';
import User from '../models/user.model.js';
import { JWT_SECRET, ADMIN_KEY, JWT_EXPIRES_IN } from "../config/env.js";
import {getUserData} from "./user.controller.js";
import ApiError from "../classes/ApiError.class.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signUp(req, res, next) {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if(existingUser) {
            throw new ApiError(409, "User already exists");
        }

        if(!JWT_SECRET) {
            throw new ApiError(500, "Server Internal Error");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        let userData = {
            ...req.body,
            role: req.body.key === ADMIN_KEY ? "admin" : "user",
            password: hashedPassword
        };

        const newUser = await User.create(userData);

        const token = jwt.sign({ userId: newUser._id, tokenVersion: newUser.tokenVersion }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        newUser.password = undefined;

        res.status(201).send({
            success: true,
            message: "User Created Successfully",
            data: {
                token: token,
                user: newUser
            }
        })
    } catch(e) {
        next(e);
    }
}

export async function signIn(req, res, next) {
    try {
        const user = await User.findOne({ email: req.body.email }).select("+password");

        if(!user) {
            throw new ApiError(404, "User Not Found");
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if(!isMatch) {
            throw new ApiError(401, "Unauthorized Access");
        }

        const token = jwt.sign({ userId: user._id, tokenVersion: user.tokenVersion }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        user.password = undefined;

        res.status(201).send({
            success: true,
            message: "User signed in Successfully",
            data: {
                token: token,
                user: user
            }
        })
    } catch(e) {
        next(e);
    }
}

export async function signOut(req, res, next) {

}

export async function signOutAllDevices(req, res, next) {
    try {
        const user = await User.findById(req.user._id);

        user.tokenVersion += 1;

        await user.save();

        res.status(201).send({
            success: true,
            message: "All Devices Logged Out"
        })

    } catch(e) {
        next(e);
    }
}
