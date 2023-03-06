import mongoose from "mongoose";

const Post = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    date: {type },
    tag: [{type: String}],
    author : {
        ref: 'user',
        id : mongoose.Schema.Types.ObjectId,
     }
}, {timestamps: true});

const modelName = "posts";
const collectionName = "posts";
const UserModel = mongoose.model(modelName, Post, collectionName);

export default UserModel;