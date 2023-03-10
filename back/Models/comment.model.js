import mongoose from "mongoose";

const Comment = mongoose.Schema({
    content: {type: String, required: true},
    date: {type: Date},
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user',
        
     },
     responses:[{
        content: {type: String},
        author: {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        date: {type: Date}
     }]
}, {timestamps: true});

const modelName = "comments";
const collectionName = "comments";
const CommentModel = mongoose.model(modelName, Comment, collectionName);

export default CommentModel;