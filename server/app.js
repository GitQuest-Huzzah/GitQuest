const express = require('express');
const db = require('./db/db');
const app = express();

console.log("before app")
app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use("/api", require('./api'));

app.use((error, req, res, next) =>{
    console.error(error);
    res.status(error.status).send(error.message);
}) 
console.log("after app")
db.sync()
module.exports = {app};

