import mongoose from "mongoose";

const Post = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    url: {type: String},
    date: {type: Date},
    tag: [{type: String}],
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user',
        id : mongoose.Schema.Types.ObjectId,
     },
     responses:[{
        content: {type: String},
        author: {
            ref: 'user',
            id : mongoose.Schema.Types.ObjectId,
        },
        date: {type: Date}
     }]
}, {timestamps: true});

const modelName = "posts";
const collectionName = "posts";
const PostModel = mongoose.model(modelName, Post, collectionName);

export default PostModel;