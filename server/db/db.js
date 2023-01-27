const Sequelize = require("sequelize");
const Bots = require("./models/Bots");

console.log("before sequelize")
const db = new Sequelize("postgres", "postgres", `_"._&BY[-It';3.q`,{
	dialect: "postgres",
	host: "/cloudsql/gitgoingslackbot:us-central1:gitgoingdb",
	logging:true,
	dialectOptions:{
		socketPath:"/cloudsql/gitgoingslackbot:us-central1:gitgoingdb"
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