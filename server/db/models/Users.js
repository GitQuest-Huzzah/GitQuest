const Sequelize = require('sequelize')
const db = require('../db.js');
const Users = db.define("user", {
    userName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    isAdmin:{
        type:Sequelize.BOOLEAN,
        default: false,
        allowNull:false
    },
    slackEmail:{
        type:Sequelize.STRING,
    },
    GHEmail:{
        type:Sequelize.STRING,
    }
})

module.exports = Users
