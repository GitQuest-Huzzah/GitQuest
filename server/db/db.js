const Sequelize = require("sequelize");

//create database link between sequelize and PG

// const db = new Sequelize("postgres://34.27.41.97/gitgoingdb", {
// 	logging: false,
// });
const db = new Sequelize({
	database: "postgres",
	username: "postgres",
	password: `***REMOVED***`,
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
  db.authenticate().then(() => {
	console.log('Connection established successfully.');
  }).catch(err => {
	console.error('Unable to connect to the database:', err);
  }).finally(() => {
	db.close();
  });
db.sync()
module.exports = db;