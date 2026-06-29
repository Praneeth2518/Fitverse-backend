import mongoose from "mongoose";
import Exercise from "../models/exercise.model.js";
import exercises from "../data/exercisesData.json" with { type: "json" };
import { DB_URI } from "../config/env.js"

console.log(DB_URI);
await mongoose.connect(DB_URI);

await Exercise.deleteMany({});
await Exercise.insertMany(exercises);

console.log("Exercises added!");

process.exit();