import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    role: String,
    picture: String
})

export const UserModel = mongoose.model("User", UserSchema);