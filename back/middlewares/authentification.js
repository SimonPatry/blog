import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";
import UserModel from "../Models/user.model.js"
import bcrypt from "bcrypt";
import { getPost } from "../controllers/posts.js";

dotenv.config();

const {APP_SECRET} = process.env;

// Password security hash

export const isUserAuthor = async (req, res,next) => {
    
    const {id} = req.params;

    const post = await getPost(id);
    const user = jsonwebtoken.decode(req.session.token);
    
    console.log(user);
    if(user != post.author.firstname) {
        return res.status(401).json({
            Unauthorized: 'You don\'t have the rights for this action'
        });
    }
    next();
}

export const hashPass = async (req, res, next) => {
    const { password } = req.body;

    await bcrypt.hash(password, 10)
    .then ((hashedPass) => {
        req.body.password = hashedPass;
    })

    next();
};

// JWT verification and authorization
export function authVerif(req, res, next){
    console.log("test")
    console.log(req.session)
    if (!req.session.token) {
        return res.status(401).json({
          Unauthorized: 'Please, login with a valid token'
        });
    }
    
    try {
        jsonwebtoken.verify(req.session.token, APP_SECRET);
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const userExists = async(email) => {
    try {
        const user = await UserModel.find({ email });
        if(user.length)
           return true;
        else
            return false;
    }
    catch (error) {
        return new Error(`Error: ${error.message}`);
    }
}

export const isAdmin = async (req, res, next) => {
    const datas = jsonwebtoken.decode(req.session.token);
    console.log(datas);
    try {
        
        if(datas.role == "admin" )
           next();
        else
            throw new Error(`Missing admin privileges`); 
    }
    catch (error) {
        return new Error(`Error: ${error.message}`);
    }
};