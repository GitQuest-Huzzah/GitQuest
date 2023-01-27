const Sequelize = require("sequelize");

const db = new Sequelize({
	database: "postgres",
	username: "postgres",
	password: `***REMOVED***`,
	host: "***REMOVED***",
	port: 5432,
	dialect: "postgres",
	logging:true,
	dialectOptions: {
		socketPath: '***REMOVED***'
	},
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