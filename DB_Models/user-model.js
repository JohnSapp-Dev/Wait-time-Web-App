import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false,
    },
    NotificationRules:[
        {
            AttractionName:{
                type: String,
                required: true,
            },
            Rule:{
                type: String,
                required: true,
                unique: true,
            },
            ExpirationData:{
                type: Date,
                required: true,
            }
        }
    ]

},{timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;