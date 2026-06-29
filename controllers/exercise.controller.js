import mongoose from "mongoose";
import Exercise from "../models/exercise.model.js";

export async function getAllExercises(req, res, next) {
    try {
        const exercises = await Exercise.find(req.query);

        res.status(201).send({
            status: "success",
            message: "Exercises found.",
            data: exercises,
        });
    } catch(e) {
        next(e);
    }
}

export async function getExercise(req, res, next) {

}

export async function createExercise(req, res, next) {

}

export async function deleteExercise(req, res, next) {

}

export async function updateExercise(req, res, next) {

}
