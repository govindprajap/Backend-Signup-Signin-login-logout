const express = require("express");
const { signup, signin, getUser, logout} = require("../controller/authController");
const jwtAuth = require("../midleware/jwtAuth");

const authRouter = express.Router();
authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.post('/user', jwtAuth, getUser)
authRouter.post('/logout', jwtAuth, logout)








module.exports = authRouter; 
