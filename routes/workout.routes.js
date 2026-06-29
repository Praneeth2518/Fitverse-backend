import { Router } from 'express';
import {
    createWorkout,
    deleteWorkout,
    getAllWorkouts,
    getWorkout,
    updateWorkout
} from "../controllers/workout.controller.js";

const workoutRouter = Router();

workoutRouter.get('/all', getAllWorkouts);

workoutRouter.post('/:id', createWorkout);
workoutRouter.get('/:id', getWorkout);
workoutRouter.put('/:id', updateWorkout);
workoutRouter.delete('/:id', deleteWorkout);

export default workoutRouter;