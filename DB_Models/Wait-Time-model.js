import mongoose, { Schema } from 'mongoose';

const attractionWaitTimeSchema = new Schema({
    id:{
        type: Number,
        required: true,
        unique: true,
        minLength : 1,
        maxLength : 20,
    },
    name:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    park:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    land:{
        type: String,
        lowercase: true,
        trim: true,
    },
    data: [
        {
            isOpen :{
                type:Boolean,
                default:false,
                required:true,
            },
            waitTime:{
                type:Number,
                required:true,
            },
            updated:{
                type:Date,
                required:true,
            }
        }
    ]
});

export const WaitTime = mongoose.model("WaitTime", attractionWaitTimeSchema);