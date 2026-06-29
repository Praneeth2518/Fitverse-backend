import ApiError from "../classes/ApiError.class.js";
import Workout from "../models/workout.model.js";

export async function getAllWorkouts(req, res, next) {

}

export async function createWorkout(req, res, next) {
    try {
        req.body.ownerId = req.user._id;
        req.body.owner = req.user.displayName;
        console.log(req.body);
        const newWorkout = await Workout.create(req.body);

        res.status(201).send({
            success: true,
            message: "Workout created successfully",
            data: newWorkout
        });
    } catch (e) {
        next(e);
    }
}

export async function getWorkout(req, res, next) {

}

export async function updateWorkout(req, res, next) {

}

export async function deleteWorkout(req, res, next) {

}