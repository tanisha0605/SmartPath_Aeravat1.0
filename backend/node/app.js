const express = require('express');
const morgan = require('morgan');

const userRouter = require(`${__dirname}/routes/userRoutes`);

const app = express();

console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/users', userRouter);

module.exports = app;
