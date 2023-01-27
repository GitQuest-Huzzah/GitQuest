const Sequelize = require("sequelize");

const db = new Sequelize({
	database: "postgres",
	username: "postgres",
	password: `_"._&BY[-It';3.q`,
	host: "34.27.41.97",
	port: 5432,
	dialect: "postgres",

  });
  db.authenticate().then(() => {
	console.log('Connection established successfully.');
  }).catch(err => {
	console.error('Unable to connect to the database:', err);
  }).finally(() => {
	db.close();
  });
db.sync()
module.exports = db;