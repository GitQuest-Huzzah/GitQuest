const Sequelize = require("sequelize");

//create database link between sequelize and PG
// const db = new Sequelize("postgres://34.27.41.97/gitgoingdb", {
// 	logging: false,
// });
const db = new Sequelize({
	database: "postgres",
	username: "postgres",
	password: `***REMOVED***`,
	host: "34.27.41.97",
	port: 5432,
	dialect: "postgres",
	dialectOptions:{
		ssl: {
			require:true,
			rejectUnauthorized:false
		}
	}

  });

db.sync()
module.exports = db;