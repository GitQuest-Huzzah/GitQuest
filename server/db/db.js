const Sequelize = require("sequelize");

const db = new Sequelize("postgres", "postgres", `_"._&BY[-It';3.q`, {
	dialect: "postgres",
	host: "/cloudsql/gitgoingslackbot:us-central1:gitgoingdb",
	logging: true,
	dialectOptions: {
		socketPath: "/cloudsql/gitgoingslackbot:us-central1:gitgoingdb",
	},
});

db.authenticate().then(() => {
	console.log('Connection established successfully.');
  }).catch(err => {
	console.error('Unable to connect to the database:', err);
  }).finally(() => {
	db.close();
  });

db.sync();
module.exports = db;
