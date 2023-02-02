const Sequelize = require("sequelize");

//this is the connection to a localinstance of the DB
// const db = new Sequelize('postgres://localhost:5432/gitgoingdb', {logging:false})
//this is the connection to the deployed DB
const db = new Sequelize("postgres", "postgres", `***REMOVED***`, {
    dialect: "postgres",
    host: "***REMOVED***",
    logging: false,
    dialectOptions: {
        socketPath: "***REMOVED***",
    },
});

db.sync();

module.exports = db;
