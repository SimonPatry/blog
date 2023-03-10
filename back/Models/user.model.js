import mongoose from "mongoose";

const User = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}, 
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    photo: {type: String},
    isAdmin: {type: Boolean, required: true}, default: false,
}, {timestamps: true});

const modelName = "users";
const collectionName = "users";
const UserModel = mongoose.model(modelName, User, collectionName);

export default UserModel;