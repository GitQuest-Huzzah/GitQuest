const Sequelize = require('sequelize')
const db = require('../db.js');
const Users = db.define("user", {
    slackID:{
        type:Sequelize.STRING,
        allowNull:false
    },
    gitHubID:{
        type:Sequelize.STRING,
    },
    isAdmin:{
        type:Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull:false
    },
})

module.exports = Users
