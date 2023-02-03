const Sequelize = require("sequelize");

//this is the connection to a localinstance of the DB
let db = "";
if(process.env.DEV === "YESSIR"){
db = new Sequelize('postgres://localhost:5432/gitgoingdb', {logging:false})
}
//this is the connection to the deployed DB
if(process.env.DEV !== "YESSIR"){
	db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	   dialect: "postgres",
	   host: process.env.DB_CONNECTION,
	   logging: false,
	   dialectOptions: {
		   socketPath: process.env.DB_CONNECTION,
	   },
   });
}

db.sync();

module.exports = db;
