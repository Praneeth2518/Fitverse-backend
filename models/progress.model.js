import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },

        date:{
            type:Date,
            default:Date.now
        },

        weight:{
            type:Number,
            min:20,
            max:400
        },

        bodyFat:{
            type:Number,
            min:0,
            max:100
        },

        chest:Number,

        waist:Number,

        hips:Number,

        shoulders:Number,

        leftArm:Number,

        rightArm:Number,

        leftThigh:Number,

        rightThigh:Number,

        leftCalf:Number,

        rightCalf:Number,

        neck:Number,

        notes:{
            type:String,
            maxlength:500
        },

        photos:[
            {
                type:String
            }
        ]
    },
    {
        timestamps:true
    }
);

export default mongoose.model("Progress",progressSchema);