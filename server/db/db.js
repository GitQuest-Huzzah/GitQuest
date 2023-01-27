const Sequelize = require("sequelize");

// const db = new Sequelize('postgres://localhost:5432/gitgoingdb')
const db = new Sequelize("postgres", "postgres", `***REMOVED***`, {
	dialect: "postgres",
	host: "***REMOVED***",
	logging: true,
	dialectOptions: {
		socketPath: "***REMOVED***",
	},
});


db.sync({force: true});

// db.sync();


module.exports = db;
