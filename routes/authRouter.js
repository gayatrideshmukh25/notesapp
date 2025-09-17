const express = require('express');
const authRouter=express.Router();

const {getLogin,postLogin,getSignUp,postSignUp,logout} = require('../controller/authController');

authRouter.get("/login",getLogin);
authRouter.post("/login",postLogin);   
authRouter.get("/logout",logout);
authRouter.get("/signup",getSignUp);
authRouter.post("/signup",postSignUp);
exports.authRouter=authRouter;