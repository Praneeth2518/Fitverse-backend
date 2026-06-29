import express from 'express';
import {PORT} from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from "./routes/user.routes.js";
import exerciseRouter from "./routes/exercise.routes.js";
import workoutRouter from "./routes/workout.routes.js";
import progressRouter from "./routes/progress.routes.js";

const app = express();

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/exercise', exerciseRouter);
app.use('/api/workout', workoutRouter);
app.use('/api/progress', progressRouter);

app.get('/', (req, res) => {
    res.send("Welcome to Fitverse");
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});