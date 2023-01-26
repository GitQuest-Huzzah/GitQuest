const Sequelize = require("sequelize");

//create database link between sequelize and PG
const db = new Sequelize("postgres://localhost:5432/gitGoingSlackBot", {
	logging: false,
});

db.sync()
module.exports = db;
