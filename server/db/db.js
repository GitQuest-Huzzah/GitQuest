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
	console.log(process.env, "in DB ROUTE");
	db = new Sequelize("postgres", "postgres", `_"._&BY[-It';3.q`, {
		dialect: "postgres",
		host: "/cloudsql/gitgoingslackbot:us-central1:gitgoingdb",
		logging: false,
		dialectOptions: {
			socketPath: "/cloudsql/gitgoingslackbot:us-central1:gitgoingdb",
		},
	});
}

module.exports = db;
