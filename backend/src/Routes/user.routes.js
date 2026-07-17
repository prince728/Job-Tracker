const express = require('express');
const { login,signup, logout,getme } = require('../Controller/auth.controller');
const AuthMiddleware =require('../Middlewares/auth.middleware');
const rateLimiterMiddleware= require('../Middlewares/rateLimiter');
const AuthRouter = express.Router();

AuthRouter.post('/login',rateLimiterMiddleware,login);
AuthRouter.post('/signup',rateLimiterMiddleware,signup);
AuthRouter.post('/logout',logout);
AuthRouter.get('/me',AuthMiddleware,getme);


module.exports =  AuthRouter;