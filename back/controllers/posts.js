import Mongoose from "mongoose";
import CommentModel from "../Models/comment.model.js";
import PostModel from '../Models/post.model.js';
import UserModel from "../Models/user.model.js";

export const getPosts = async (req, res) => {
    const posts = await PostModel.find();

    res.json(posts);
};

export const getPost = async (req, res) => {
    const {FRONTEND_URL} = process.env
    const { id } = req.params;
    let comments = await CommentModel.find({"post_id": Mongoose.Types.ObjectId(id)});
    comments.map(async (comment) => {
        UserModel.find({"_id": comment.author})
        .then((response) => {
            comment = {
                ...comment,
                author: response[0]
            }
        })
    })
    let post = await PostModel.find({"_id": Mongoose.Types.ObjectId(id)}) ;
    post = {
        ...post,
        comments: comments
    }

    /* db.employee.aggregate([{$lookup:{from:'address',localField:'address',foreignField:"_id",as:'addr'}}])*/
    // post.populate("comments");
    console.log(post);
    res.json(post);
};

export const addPost = async (req, res) => {
    const { FRONTEND_URL } = process.env; 
    const {
        title,
        content,
        author,
        tags
    } = req.body;
    console.log(req.body)
    try {
          const post = await UserModel.create({
            title,
            content,
            tags, 
            date: new Date(),
            responses: [],
            author
          });
          console.log(`Your post has been added!\n`);
          res.status(200).json({
            "status": true,
            "object": post,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': FRONTEND_URL,
          });
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

export const deletePost = async (req, res) => {
    
    const { id } = req.params;
    
    try{
        await PostModel.deleteOne({_id: mongoose.Types.ObjectId(id)})
          .then(res => {
            console.log(res);
            res.json("Post successfully destroyed")
        })
    } catch(e) {
        console.error(e);
        res.json(e)
    }
};

export const updatePost = async (req, res) => {
    const id = req.params.id;
    const {FRONTEND_URL} = process.env;

    const {
        title,
        content,
        date,
        tags,
        comments
    } = req.body;

    try {
        const update = await PostModel.updateOne({
            _id: mongoose.Types.ObjectId(id)
        }, 
        {
            title,
            content,
            date,
            tags,
            comments
        })
        res.status(200).json({
            "status": true,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': FRONTEND_URL,
            'message': 'Userd updated successfully'
          });
    } catch(error) {
        console.log(`Error: ${error.message}`);
    }
};