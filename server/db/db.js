const Sequelize = require("sequelize");

//this is the connection to DB
const options = () => {
	if (process.env.ENV === "DEV") {
		console.log("hit 1");
		return process.env.DB_CONNECTION;
	}
	return (
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
};
const db = new Sequelize(options());
db.sync();
module.exports = db;
