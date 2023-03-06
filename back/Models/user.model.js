import mongoose from "mongoose";

const User = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}, 
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    photo: {type: String},
    category: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},
}, {timestamps: true});

const modelName = "users";
const collectionName = "users";
const UserModel = mongoose.model(modelName, User, collectionName);

export default UserModel;