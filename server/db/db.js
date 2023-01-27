const Sequelize = require("sequelize");

const db = new Sequelize("postgres", "postgres", `_"._&BY[-It';3.q`, {
	dialect: "postgres",
	host: "/cloudsql/gitgoingslackbot:us-central1:gitgoingdb",
	logging: true,
	dialectOptions: {
		socketPath: "/cloudsql/gitgoingslackbot:us-central1:gitgoingdb",
	},
});

db.sync();
module.exports = db;
