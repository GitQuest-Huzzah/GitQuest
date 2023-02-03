const Sequelize = require("sequelize");

//this is the connection to a localinstance of the DB
console.log(process.env)
let db = "";
if(process.env.NODE_ENV !== "production"){
db = new Sequelize('postgres://localhost:5432/gitgoingdb', {logging:false})
}
//this is the connection to the deployed DB
if(process.env.NODE_ENV === "production"){
	
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
