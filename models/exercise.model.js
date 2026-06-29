import mong from 'mongoose';

const exerciseSchema = new mong.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
        unique: true
    },
    category: {
        type: String,
        enum: [
            "Strength",
            "Cardio",
            "Flexibility",
            "Balance",
            "HIIT",
            "Mobility",
            "Other",
        ],
        required: true,
    },
    primaryMuscleGroup: {
        type: [String],
        enum: [
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
            "Full Body",
        ],
        default: [],
    },
    secondaryMuscleGroup: {
        type: [String],
        enum: [
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
            "Full Body",
        ],
        default: [],
    },
    equipment: {
        type: [String],
        enum: [
            "None",
            "Dumbbell",
            "Barbell",
            "Machine",
            "Cable",
            "Kettlebell",
            "Resistance Band",
            "Pull-up Bar",
            "Bench",
            "Other",
        ],
        default: [],
    },
    force: {
        type: String,
        enum: ["Push", "Pull", "Static"]
    },
    mechanic: {
        type: String,
        enum: ["Compound", "Isolation"]
    },
    movementPattern: {
        type: String,
        enum: [
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
    },
    difficulty: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000,
    },
    instructions: {
        type: [String],
        default: [],
    },
    imageUrl: {
        type: String,
        trim: true,
    },
    videoUrl: {
        type: String,
        trim: true,
    },
    isEquipmentBased: {
        type: Boolean,
    }
}, {
    timestamps: true
})

const Exercise = mong.model('Exercise', exerciseSchema);

export default Exercise;