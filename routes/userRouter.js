const express = require('express');
const userRouter=express.Router();
const {home,index,getNotes} = require('../controller/home')

// userRouter.get("/",index);
userRouter.get("/",home);
userRouter.get("/getNotes",getNotes);


exports.userRouter=userRouter;