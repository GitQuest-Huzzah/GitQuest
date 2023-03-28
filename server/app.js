const express = require("express");
const app = express();
const cors = require('cors')

//json parsing middleware
app.use(express.json());
app.use(cors({origin: 'https://gitquest.fun/api'}))

//url param decoding middleware
app.use(express.urlencoded({ extended: false }));

//link app to app routes
app.use("/api", require("./api"));

//app error handling
app.use((error, _req, res, _next) => {
	console.error(error);
	res.status(error.status).send(error.message);
});

module.exports = app;
