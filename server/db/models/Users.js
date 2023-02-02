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
    gitHubLogin:{
        type:Sequelize.STRING
    },
    gitHubToken:{
        type:Sequelize.STRING,
    },
    isAdmin:{
        type:Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull:false
    },
    level:{
        type:Sequelize.INTEGER,
        defaultValue: 1,
    },
    exp:{
        type:Sequelize.INTEGER,
        defaultValue: 0,
    },
    gold:{
        type:Sequelize.INTEGER,
        defaultValue: 0,
    },
    rewardGold:{
        type:Sequelize.INTEGER,
        defaultValue: 0,
    },
})

module.exports = Users
