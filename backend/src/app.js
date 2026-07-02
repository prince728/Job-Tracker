const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors');
require('dotenv').config();

const AuthRouter =require('./Routes/user.routes');
const ApplicationRouter =require('./Routes/application.routes');
const AiRouter = require('./Routes/ai.routes');


const app= express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',AuthRouter);
app.use('/api/application',ApplicationRouter);
app.use('/api/ai',AiRouter);



module.exports = app;