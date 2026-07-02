const express = require('express');
const {matchResumeScore, interviewPrep} = require('../Controller/ai.controller');
const AuthMiddleware = require('../Middlewares/auth.middleware');

const AiRouter = express.Router();

AiRouter.post('/match-score',AuthMiddleware,matchResumeScore);
AiRouter.post('/interview-prep',AuthMiddleware,interviewPrep);



module.exports =  AiRouter;