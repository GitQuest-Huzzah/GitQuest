const Sequelize = require("sequelize");

// const db = new Sequelize('postgres://localhost:5432/gitgoingdb')
const db = new Sequelize("postgres", "postgres", `_"._&BY[-It';3.q`, {
    dialect: "postgres",
    host: "/cloudsql/gitgoingslackbot:us-central1:gitgoingdb",
    logging: false,
    dialectOptions: {
        socketPath: "/cloudsql/gitgoingslackbot:us-central1:gitgoingdb",
    },
});

// db.authenticate()
//     .then(() => {
//         console.log("Connection has been established successfully.");
//     })
//     .catch((err) => {
//         console.error("Unable to connect to the database:", err);
//     });

db.sync({force: true});

// db.sync();

module.exports = db;
