import mong from "mongoose";

const workoutSchema = new mong.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        exercises: [
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
            },
        ],
        isPublic: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Workout = mong.model("Workout", workoutSchema);

export default Workout;