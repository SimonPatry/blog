import express from "express";
import { hashPass, authVerif, isAdmin } from "../middlewares/authentification.js"
import { Login } from "../controllers/login.js";
import { SignIn } from "../controllers/signin.js";
import {
    getUser,
    getRandomUser,
    getSessionUser,
    getUsers,
    updateUser,
    deleteUser,
} from "../controllers/user.js";

const router = express.Router();

// GET
router.get("/users/:id", getUser);
router.get("/users", getUsers);
router.get("/user", authVerif, getSessionUser);
router.get("/random", getRandomUser);


// POSTS
router.post("/login", Login);
router.post("/sign_in", authVerif, isAdmin, hashPass, SignIn);

// PATCH
router.patch("/users/:id", authVerif, updateUser)

// DELETE
router.delete("/users/:id", authVerif, isAdmin, deleteUser)


export default router;
