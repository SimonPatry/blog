import mongoose from "mongoose";
import PostModel from '../Models/post.model.js';

export const getPosts = async (req, res) => {
    const posts = await PostModel.find({});

    res.json(posts);
};

export const getPost = async (req, res) => {
    const { id } = req.params;
    const post = await PostModel.findById(id);
    
    res.json(post);
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