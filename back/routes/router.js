import express from "express";
import { hashPass, authVerif, isAdmin, isUserAuthor } from "../middlewares/authentification.js"
import { Login } from "../controllers/login.js";
import { SignIn } from "../controllers/signin.js";
import {
    getUser,
    getSessionUser,
    getUsers,
    updateUser,
    deleteUser,
} from "../controllers/user.js";
import {
    getPost,
    getPosts,
    deletePost,
    updatePost,
    addPost
} from "../controllers/posts.js";
import { addComment, updateComment } from "../controllers/comments.js";


const router = express.Router();

// GET

router.get("/users/:id", getUser);
router.get("/users", getUsers);
router.get("/user", authVerif, getSessionUser);

router.get("/posts/:id", authVerif, getPost);
router.get("/posts", authVerif, getPosts);

// POSTS
router.post("/login", Login);
router.post("/post", addPost);
router.post("/comment", addComment);
router.post("/sign_in", hashPass, SignIn);

// PATCH
router.patch("/users/:id", authVerif, updateUser)
router.patch("/posts/:id", authVerif, isUserAuthor, updatePost)
router.patch("/comments/:id", authVerif, updateComment)

// DELETE
router.delete("/users/:id", authVerif, isAdmin, deleteUser)
router.delete("/posts/:id", authVerif, isUserAuthor, deletePost)


export default router;
