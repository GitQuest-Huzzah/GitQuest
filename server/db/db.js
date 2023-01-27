const Sequelize = require("sequelize");

const db = new Sequelize({
	database: "postgres",
	username: "postgres",
	password: `_"._&BY[-It';3.q`,
	host: "/cloudsql/gitgoingslackbot:us-central1:gitgoingdb",
	port: 5432,
	dialect: "postgres",
	logging:true,
	dialectOptions: {
		socketPath: '/cloudsql/gitgoingslackbot:us-central1:gitgoingdb'
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