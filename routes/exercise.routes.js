import { Router } from 'express';
import {
    createExercise,
    deleteExercise,
    getAllExercises,
    getExercise,
    updateExercise
} from "../controllers/exercise.controller.js";

const exerciseRouter = Router();

exerciseRouter.get('/', getAllExercises);

exerciseRouter.get('/:id', getExercise);
exerciseRouter.post('/:id', createExercise);
exerciseRouter.delete('/:id', deleteExercise);
exerciseRouter.put('/:id', updateExercise);

export default exerciseRouter;
