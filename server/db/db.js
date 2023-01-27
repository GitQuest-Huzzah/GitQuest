const Sequelize = require("sequelize");

const db = new Sequelize("postgres", "postgres", `***REMOVED***`,{
	dialect: "postgres",
	host: "***REMOVED***",
	// database: "postgres",
	// username: "postgres",
	// password: `***REMOVED***`,
	port: 5432,
	logging:true,
	dialectOptions: {
		socketPath: '***REMOVED***'
	},
	operatorsAliases: false
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