const express = require('express');
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use("/api", require('./api'));

app.use((error, req, res, next) =>{
    console.error(error);
    res.status(error.status).send(error.message);
}) 

module.exports = {app};

