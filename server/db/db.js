const Sequelize = require("sequelize");

//create database link between sequelize and PG

// const db = new Sequelize("postgres://34.27.41.97/gitgoingdb", {
// 	logging: false,
// });
const db = new Sequelize({
	database: "postgres",
	username: "postgres",
	password: `_"._&BY[-It';3.q`,
	host: "172.17.0.1",
	port: 5432,
	dialect: "postgres",
	dialectOptions:{
		ssl: {
			require:true,
			rejectUnauthorized:false
		}
	}

  });
db.authenticate().then(()=> console.log("connected to database")).catch((error=> console.error(error)))

db.sync()
module.exports = db;