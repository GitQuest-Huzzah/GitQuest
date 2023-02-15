const Sequelize = require("sequelize");

const db = (() => {
	switch (process.env.ENVIRONMENT) {
		case "production":
			return new Sequelize(
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

		default:
			return new Sequelize("postgres://localhost:5432/gitgoingdb", {
				logging: false,
			});
	}
})();

db.sync({force:true});
module.exports = db;
