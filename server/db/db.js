const Sequelize = require("sequelize");

const db = new Sequelize("postgres", "postgres", `_"._&BY[-It';3.q`,{
	dialect: "postgres",
	host: "/cloudsql/gitgoingslackbot:us-central1:gitgoingdb",
	logging:true,
  });
  db.authenticate().then(() => {
	console.log('Connection established successfully.');
  }).catch(err => {
	console.error('Unable to connect to the database:', err);})
db.sync()
module.exports = db;