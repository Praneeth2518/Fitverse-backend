import express from 'express';
import {PORT} from './config/env.js';
import progressRouter from "./routes/progress.routes.js";
import workoutRouter from "./routes/workout.routes.js";
import exerciseRouter from "./routes/exercise.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import {connectToDB} from "./database/mongodb.js";
import {errorMiddleware} from "./middlewares/error.middleware.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/exercise', exerciseRouter);
app.use('/api/workout', workoutRouter);
app.use('/api/progress', progressRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send("Welcome to Fitverse");
})

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}...`);
    await connectToDB()
});

/*
"/api/auth" -> signup, signin, logout, etc
"/api/user" -> get user data
"/api/exercise" -> get exercise data
"/api/workout" -> get workout data
"/api/progress"
 */