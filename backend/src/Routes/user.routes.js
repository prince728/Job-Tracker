const express = require('express');
const { login,signup, logout,getme } = require('../Controller/auth.controller');
const AuthMiddleware =require('../Middlewares/auth.middleware');

const AuthRouter = express.Router();

AuthRouter.post('/login',login);
AuthRouter.post('/signup',signup);
AuthRouter.post('/logout',logout);
AuthRouter.get('/me',AuthMiddleware,getme);


module.exports =  AuthRouter;