import mong from 'mongoose';

const userSchema = new mong.Schema({
    displayName: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'username is required'],
        minlength: [3, 'Minimum Length is 3'],
        maxlength: [20, 'Maximum Length is 20'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "Please enter a valid email address",
        ],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [8, 'minLength: 5'],
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    tokenVersion: {
        type: Number,
        default: 1
    },
    height: {
        type: Number,
    },
    currentWeight: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ['female', 'male'],
        default: 'male'
    },
    dob: {
        type: Date,
        required: [true, 'DOB is required'],
        max: Date.now
    },
    unit: {
        type: String,
        enum: ['us', 'uk'],
        default: 'uk'
    },
    targetWeight: {
        type: Number
    },
    description: {
        type: String,
    }
}, {
    timestamps: true
})

userSchema.pre("validate", function () {
    if(!this.displayName) {
        this.displayName = this.username;
    }
})

const User = mong.model('User', userSchema);

export default User;