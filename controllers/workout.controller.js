import ApiError from "../classes/ApiError.class.js";
import Workout from "../models/workout.model.js";
import { GROQ_API_KEY } from "../config/env.js"
import Exercise from "../models/exercise.model.js";

export async function getAllWorkouts(req, res, next) {
    try {
        const workouts = await Workout.find({...req.query, isPublic: true});

        res.status(201).send({
            status: "success",
            message: "Workouts found.",
            data: workouts,
        });
    } catch(e) {
        next(e);
    }
}

async function getAIFilters(prompt) {
    try {
        const filterPrompt = `
             You are an expert fitness assistant.
            
            Your task is to analyze the user's workout request and extract ONLY the filters that can be used to search an exercise database.
            
            User request:
            """
            ${prompt}
            """
            
            The exercise database has these fields:
            
            - category
            - primaryMuscleGroup
            - secondaryMuscleGroup
            - equipment
            - force
            - mechanic
            - movementPattern
            - difficulty
            - isEquipmentBased
            
            - MAKE SURE YOU ARE ONLY GIVING THE ALLOWED VALUES
            
            Allowed values:
            
            category:
            ["Strength","Cardio","Flexibility","Balance","HIIT","Mobility","Other"]
            
            primaryMuscleGroup / secondaryMuscleGroup:
            [
            "Chest",
            "Back",
            "Shoulders",
            "Biceps",
            "Triceps",
            "Forearms",
            "Abs",
            "Obliques",
            "Quadriceps",
            "Hamstrings",
            "Glutes",
            "Calves",
            "Full Body"
            ]
            
            equipment:
            [
            "None",
            "Dumbbell",
            "Barbell",
            "Machine",
            "Cable",
            "Kettlebell",
            "Resistance Band",
            "Pull-up Bar",
            "Bench",
            "Other"
            ]
            
            force:
            ["Push","Pull","Static"]
            
            mechanic:
            ["Compound","Isolation"]
            
            movementPattern:
            [
            "Horizontal Push",
            "Vertical Push",
            "Horizontal Pull",
            "Vertical Pull",
            "Squat",
            "Hinge",
            "Lunge",
            "Carry",
            "Rotation",
            "Core"
            ]
            
            difficulty:
            ["Beginner","Intermediate","Advanced"]
            
            isEquipmentBased:
            true or false
            
            Rules:
            
            - Extract only information explicitly stated or strongly implied.
            - Never invent filters.
            - Use only the allowed values.
            - If a filter is not mentioned, return an empty array for array fields and null for single-value fields.
            - Do not explain anything.
            - Return ONLY valid JSON.
            
            JSON schema:
            
            {
              "category": [],
              "primaryMuscleGroup": [],
              "secondaryMuscleGroup": [],
              "equipment": [],
              "force": null,
              "mechanic": null,
              "movementPattern": null,
              "difficulty": null,
              "isEquipmentBased": null
            }
        `;

        const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        {
                            role: 'user',
                            content: filterPrompt
                        }
                    ],
                    temperature: 0,
                    response_format: {
                        type: "json_object"
                    }
                })
            }
        )

        if (!response.ok) {
            const error = await response.text();

            console.log("===== GROQ ERROR =====");
            console.log(error);

            throw new ApiError(response.status, error);
        }

        const dataJSON = await response.json();

        const content = dataJSON?.choices?.[0]?.message?.content;

        const f = JSON.parse(content);

        const query = {};

        if (f.category?.length)
            query.category = {$in: f.category};

        if (f.primaryMuscleGroup?.length)
            query.primaryMuscleGroup = {$in: f.primaryMuscleGroup};

        if (f.secondaryMuscleGroup?.length)
            query.secondaryMuscleGroup = {$in: f.secondaryMuscleGroup};

        if (f.equipment?.length)
            query.equipment = {$in: f.equipment};

        if (f.force)
            query.force = f.force;

        if (f.mechanic)
            query.mechanic = f.mechanic;

        if (f.movementPattern)
            query.movementPattern = f.movementPattern;

        if (f.difficulty)
            query.difficulty = f.difficulty;

        if (f.isEquipmentBased !== null)
            query.isEquipmentBased = f.isEquipmentBased;

        return query;
    } catch (e) {
        console.log(e);
    }
}

export async function createWorkoutAI(req, res, next) {
    try {
        const query = await getAIFilters(req.body.prompt);
        const exercises = await Exercise.find(query).select("_id name").lean();

        const exerciseText = exercises
            .map((e, i) =>
                `${i}|${e.name}`
            )
            .join("\n");

        const prompt = `
            You are an expert certified fitness coach.
            
            The user wants the following workout:
            
            ${req.body.prompt}
            
            You MUST build the workout using ONLY the exercises below.
            
            Available exercises:
            ${exerciseText}
            
            Rules:
            - Use ONLY exercises from the provided list.
            - Use ONLY the exercises from the provided list.
            - Each exercise has an integer field called "index".
            - When selecting an exercise, return its "index".
            - There are exactly ${exercises.length} exercises.
            - Valid exerciseIndex values are integers from 0 to ${exercises.length - 1}.    
            - Never output any other number.
            - Never return an ObjectId.
            - Never invent an exercise.
            - If the user's exact request cannot be satisfied, choose the closest available exercises.
            - Prioritize safety, balanced programming, proper exercise order, recovery, and evidence-based training.
            - Prefer compound exercises before isolation exercises unless the user's request specifies otherwise.
            - Avoid unnecessary duplicate exercises.
            - Use realistic sets, reps, and rest periods.
            - If the user provides little information, make sensible assumptions.
            - workout should contain atleast one exercise
            
            Return ONLY valid JSON with this exact schema:
            
            {
              "name": "Workout Name",
              "description": "Short description",
              "difficulty": "Beginner | Intermediate | Advanced",
              "estimatedDuration": 45,
              "exercises": [
                {
                  "exerciseIndex": 0,
                  "sets": 3,
                  "reps": 10,
                  "rest": 90
                }
              ]
            }
            
            Requirements:
            - name: string
            - description: string
            - difficulty: Beginner | Intermediate | Advanced
            - estimatedDuration: integer (minutes)
            - exercises: 3-15 items
            - sets: 1-10
            - reps: 1-30
            - rest: 15-300 seconds
            
            Output ONLY the JSON object.
            `;

        const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0,
                    response_format: {
                        type: "json_object"
                    }
                })
            }
        )

        if (!response.ok) {
            const error = await response.text();

            console.log("===== GROQ ERROR =====");
            console.log(error);

            throw new ApiError(response.status, error);
        }

        const dataJSON = await response.json();

        const content = dataJSON?.choices?.[0]?.message?.content;

        const data = JSON.parse(content);

        data.exercises = data.exercises.map(ex => ({
            exercise: exercises[ex.exerciseIndex]._id,
            sets: ex.sets,
            reps: ex.reps,
            rest: ex.rest
        }));

        console.log(req.user);
        data.ownerId = req.user._id;
        const newWorkout = await Workout.create(data);

        res.status(201).send({
            success: true,
            message: "Workout created successfully",
            data: newWorkout
        });
    } catch (e) {
        next(e);
    }
}

export async function createWorkout(req, res, next) {
    try {
        req.body.ownerId = req.user._id;
        req.body.owner = req.user.displayName;

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

export async function getWorkouts(req, res, next) {
    try {
        const workouts = await Workout.find({ownerId: req.user._id});

        if(!workouts) {
            throw new ApiError(404, "No Workouts Found");
        }

        res.status(200).send({
            success: true,
            message: "Workouts found",
            data: workouts
        })
    } catch(e) {
        next(e);
    }
}

export async function getWorkout(req, res, next) {
    try {
        let workout = await Workout.findById(req.params.id);

        if(!workout) {
            throw new ApiError(404, "No Workout Found");
        }

        if(!workout.isPublic && !workout.ownerId.equals(req.user._id)) throw new ApiError(401, "Unauthorized Access");

        res.status(200).send({
            success: true,
            message: "Workout found",
            data: workout
        })
    } catch(e) {
        next(e);
    }
}

export async function updateWorkout(req, res, next) {
    try {
        let workout = await Workout.findById(req.params.id);

        if(!workout) {
            throw new ApiError(404, "No workout Found");
        }

        if(!req.user._id.equals(workout.ownerId))
            throw new ApiError(401, "diff id Unauthorized Access");

        const newWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body.newWorkout, { returnDocument: "after", runValidators: true });

        res.status(200).send({
            success: true,
            message: "Workout updated successfully",
            data: newWorkout
        })
    } catch(e) {
        next(e);
    }
}

export async function deleteWorkout(req, res, next) {
    try {
        let workout = await Workout.findById(req.params.id);

        if(!workout) {
            throw new ApiError(404, "No workout Found");
        }

        if(!req.user._id.equals(workout.ownerId))
            throw new ApiError(401, "diff id Unauthorized Access");

        const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);

        res.status(200).send({
            success: true,
            message: "Workout deleted successfully",
            data: deletedWorkout
        })
    } catch(e) {
        next(e);
    }
}