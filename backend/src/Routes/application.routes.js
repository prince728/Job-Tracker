const express = require('express');
const AuthMiddileware = require('../Middlewares/auth.middleware');
const { createApplication, getAllApplication, getApplication ,updateApplication,deleteApplication} = require('../Controller/application.controller')

const ApplicationRouter = express.Router();


ApplicationRouter.post('/create', AuthMiddileware, createApplication);
ApplicationRouter.get('/get/:id', AuthMiddileware, getApplication);
ApplicationRouter.get('/get-all', AuthMiddileware, getAllApplication);
ApplicationRouter.put('/update/:id', AuthMiddileware, updateApplication); 
ApplicationRouter.delete('/delete/:id', AuthMiddileware, deleteApplication); 


module.exports =  ApplicationRouter;