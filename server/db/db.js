const Sequelize = require("sequelize");

// const db = new Sequelize('postgres://localhost:5432/gitgoingdb')
const db = new Sequelize("postgres", "postgres", `***REMOVED***`, {
    dialect: "postgres",
    host: "***REMOVED***",
    logging: false,
    dialectOptions: {
        socketPath: "***REMOVED***",
    },
});

db.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

db.sync();

// db.sync();

module.exports = db;
