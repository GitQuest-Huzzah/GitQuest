const Sequelize = require("sequelize");

//this is the connection to a localinstance of the DB
const db = new Sequelize('postgres://localhost:5432/gitgoingdb', {logging:false})
//this is the connection to the deployed DB
// const db = new Sequelize("postgres", "postgres", `_"._&BY[-It';3.q`, {
//     dialect: "postgres",
//     host: "/cloudsql/gitgoingslackbot:us-central1:gitgoingdb",
//     logging: false,
//     dialectOptions: {
//         socketPath: "/cloudsql/gitgoingslackbot:us-central1:gitgoingdb",
//     },
// });

db.sync({force:true});

module.exports = db;
