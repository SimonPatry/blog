import mongoose from "mongoose";

const Post = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Date},
    tags: [{type: String}],
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
}, {timestamps: true});

const modelName = "posts";
const collectionName = "posts";
const PostModel = mongoose.model(modelName, Post, collectionName);

export default PostModel;