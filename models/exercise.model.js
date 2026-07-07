import mong from 'mongoose';

const exerciseSchema = new mong.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
        unique: true,
        select: false
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
        select: false
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
        select: false
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
        select: false
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
        select: false
    },
    force: {
        type: String,
        enum: ["Push", "Pull", "Static"],
        select: false
    },
    mechanic: {
        type: String,
        enum: ["Compound", "Isolation"],
        select: false
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
        ],
        select: false
    },
    difficulty: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
        select: false
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000,
        select: false
    },
    instructions: {
        type: [String],
        default: [],
        select: false
    },
    imageUrl: {
        type: String,
        trim: true,
        select: false
    },
    videoUrl: {
        type: String,
        trim: true,
        select: false
    },
    isEquipmentBased: {
        type: Boolean,
        select: false
    }
}, {
    timestamps: true
})

const Exercise = mong.model('Exercise', exerciseSchema);

export default Exercise;