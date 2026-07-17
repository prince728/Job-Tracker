const express = require('express');
const {matchResumeScore, interviewPrep} = require('../Controller/ai.controller');
const AuthMiddleware = require('../Middlewares/auth.middleware');
const aiRateLimiterMiddleware = require('../Middlewares/aiRateLimiter');

const AiRouter = express.Router();

AiRouter.post('/match-score',AuthMiddleware,aiRateLimiterMiddleware,matchResumeScore);
AiRouter.post('/interview-prep',AuthMiddleware,aiRateLimiterMiddleware,interviewPrep);



module.exports =  AiRouter;