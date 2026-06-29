import mong from "mongoose";

const workoutSchema = new mong.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        exercises: {
            type: [
                {
                    exercise: {
                        type: mong.Schema.Types.ObjectId,
                        ref: "Exercise",
                        required: true,
                    },
                    sets: {
                        type: Number,
                        min: 1,
                    },
                    reps: {
                        type: Number,
                        min: 1,
                    },
                    weight: {
                        type: Number,
                        min: 0,
                    },
                    duration: {
                        type: Number,
                        min: 0,
                    },
                    rest: {
                        type: Number,
                        min: 0,
                    },
                    order: {
                        type: Number,
                        min: 1,
                    },
                }
            ],
            validate: {
                validator: (v) => v.length > 0,
                message: "Workout should contain at least one Exercise"
            }
        },
        isPublic: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
        ownerId: {
            type : mong.Schema.Types.ObjectId,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Workout = mong.model("Workout", workoutSchema);

export default Workout;