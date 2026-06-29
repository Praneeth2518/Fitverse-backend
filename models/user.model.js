import mong from 'mongoose';

const userSchema = new mong.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [3, "Username must be at least 3 characters"],
        maxlength: [20, "Username cannot exceed 20 characters"],
        trim : true
    },
    email: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/,
            "Please enter a valid email address",
        ],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [8, 'minLength is 5'],
        select: false,
    },
    dob: {
        type: Date,
        required: [true, "dob is required"],
        max: Date.now,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    tokenVersion: {
        type: Number,
        default: 1,
    },
    height:{
        type:Number,
        min:50,
        max:250
    },
    currentWeight:{
        type:Number,
        min:20,
        max:400
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male',
    },
    unit: {
        type: String,
        enum: ['si', 'us'],
        default: 'si',
    },
    targetWeight: {
        type:Number,
        min:20,
        max:400
    },
    description: {
        type: String,
    }
}, {
      timestamps: true
})

const User = mong.model('User', userSchema);

export default User;