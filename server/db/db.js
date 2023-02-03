const Sequelize = require("sequelize");
const retrieveSecrets = require("../../retrieveSecret");

//this is the connection to a localinstance of the DB

let db;
//this is the connection to the deployed DB
if (process.env.NODE_ENV !== "production") {
	db = new Sequelize("postgres://localhost:5432/gitgoingdb", {
		logging: false,
	});
}
if (process.env.NODE_ENV === "production") {
	db = new Sequelize("postgres", "postgres", `***REMOVED***`, {
		dialect: "postgres",
		host: "***REMOVED***",
		logging: false,
		dialectOptions: {
			socketPath: "***REMOVED***",
		},
	});
}

module.exports = db;
