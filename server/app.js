const express = require('express');
const app = express();

//json parsing middleware
app.use(express.json());

//url param decoding middleware
app.use(express.urlencoded({extended:false}));

//link app to app routes
app.use("/api", require('./api'));

//app error handling
app.use((error, req, res, next) =>{
    console.error(error);
    res.status(error.status).send(error.message);
}) 
module.exports = {app};

