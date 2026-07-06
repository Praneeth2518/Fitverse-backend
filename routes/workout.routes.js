import { Router } from 'express';
import {
    createWorkout, createWorkoutAI,
    deleteWorkout,
    getAllWorkouts,
    getWorkout, getWorkouts,
    updateWorkout
} from "../controllers/workout.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";


const workoutRouter = Router();

workoutRouter.get('/all', getAllWorkouts);

workoutRouter.post('/', authMiddleware, createWorkout);
workoutRouter.post('/ai', authMiddleware, createWorkoutAI);
workoutRouter.get('/:id', authMiddleware, getWorkout);
workoutRouter.get('/', authMiddleware, getWorkouts);
workoutRouter.put('/:id', authMiddleware, updateWorkout);
workoutRouter.delete('/:id', authMiddleware, deleteWorkout);

export default workoutRouter;