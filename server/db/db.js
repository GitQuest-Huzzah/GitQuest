const Sequelize = require("sequelize");

//this is the connection to a localinstance of the DB
if (process.env.ENV) {
	const db = new Sequelize(process.env.DB_CONNECTION_DEV, { logging: false });
	db.sync();

module.exports = db;
}
// this is the connection to the deployed DB
if (process.env.DB_NAME) {
	const db = new Sequelize(
		process.env.DB_NAME,
		process.env.DB_USER,
		process.env.DB_PASSWORD,
		{
			dialect: "postgres",
			host: process.env.DB_CONNECTION,
			logging: false,
			dialectOptions: {
				socketPath: process.env.DB_CONNECTION,
			},
		}
	);
	db.sync();

module.exports = db;
}

