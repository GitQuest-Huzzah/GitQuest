const Sequelize = require("sequelize");

// const db = new Sequelize('postgres://localhost:5432/gitgoingdb', {logging:false})
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
