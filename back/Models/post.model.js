import mongoose from "mongoose";

const Post = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    url: {type: String},
    date: {type: Date},
    tags: [{type: String}],
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user',
        
     },
     comments:[{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'comment',
     }]
}, {timestamps: true});

const modelName = "posts";
const collectionName = "posts";
const PostModel = mongoose.model(modelName, Post, collectionName);

export default PostModel;