import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    }
});


userSchema.plugin(passportLocalMongoose);
export const User = mongoose.model('User', userSchema);
