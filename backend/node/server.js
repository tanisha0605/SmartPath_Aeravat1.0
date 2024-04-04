const mongoose = require ('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

process.on('uncaughtException', (err) =>{
    console.log("Uncaught Exception...Server is shutting down...");
    console.log(err);
})

mongoose.connect(DB).then(() =>{
    console.log("DB connections successful!");
})

const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) =>{
    console.log("Unhandled Rejection...Server is shutting down...");
    console.log(err);
    server.close(()=>{
        process.exit(1);
    })
})
