import mongoose from "mongoose";
import CommentModel from '../Models/comment.model.js';
import useParams from 'react-router-dom';

export const getPostComments = async (req, res) => {
    const { id } = useParams();

    const Comments = await CommentModel.find({post: id});
    
    res.json(Comments);
};

export const getComment = async (req, res) => {
    const { id } = req.params;
    const comment = await CommentModel.findById(id);
    
    res.json(comment);
};

export const addComment = async (req, res) => {
    const { FRONTEND_URL } = process.env; 
    const {
        title,
        content,
        author,
        tags
    } = req.body;
    console.log(req.body)
    try {
          const comment = await CommentModel.create({
            title,
            content,
            tags, 
            date: new Date(),
            responses: [],
            author
          });
          console.log(`Your Comment has been added!\n`);
          res.status(200).json({
            "status": true,
            "object": comment,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': FRONTEND_URL,
          });
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

export const deleteComment = async (req, res) => {
    
    const { id } = req.params;
    
    try{
        await CommentModel.deleteOne({_id: mongoose.Types.ObjectId(id)})
          .then(res => {
            console.log(res);
            res.json("Comment successfully destroyed")
        })
    } catch(e) {
        console.error(e);
        res.json(e)
    }
};

export const updateComment = async (req, res) => {
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
        const update = await CommentModel.updateOne({
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