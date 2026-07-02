const express = require('express');
const { login,signup, logout } = require('../Controller/auth.controller');

const AuthRouter = express.Router();

AuthRouter.post('/login',login);
AuthRouter.post('/signup',signup);
AuthRouter.post('/logout',logout);


module.exports = AuthRouter;