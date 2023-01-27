const Sequelize = require("sequelize");
const Bots = require("./models/Bots");

console.log("before sequelize")
const db = new Sequelize("postgres", "postgres", `***REMOVED***`,{
	dialect: "postgres",
	host: "***REMOVED***",
	logging:true,
	dialectOptions:{
		socketPath:"***REMOVED***"
	}
  });
  
  Bots.create({
    token: "Token123",
    teamID: "teamID123",
    teamName: "teamName123"
})
console.log("after Sequelize")
db.sync()
module.exports = db;