import mong from 'mongoose';

const exerciseSchema = new mong.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true
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
    muscleGroup: {
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
        type: String,
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
        default: "None",
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