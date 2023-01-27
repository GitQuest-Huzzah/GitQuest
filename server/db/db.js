const Sequelize = require("sequelize");

const db = new Sequelize("postgres", "postgres", `***REMOVED***`,{
	dialect: "postgres",
	host: "***REMOVED***",
	logging:true,
  });
  db.authenticate().then(() => {
	console.log('Connection established successfully.');
  }).catch(err => {
	console.error('Unable to connect to the database:', err);})
db.sync()
module.exports = db;