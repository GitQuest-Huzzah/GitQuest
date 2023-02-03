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
    commits:{
        type:Sequelize.INTEGER,
        defaultValue: 0,
    },
    pullRequests:{
        type:Sequelize.INTEGER,
        defaultValue: 0,
    },
    level:{
        type:Sequelize.INTEGER,
        defaultValue: 1,
    },
    title:{
        type:Sequelize.STRING,
        defaultValue: 'Neophyte',
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
    achievements:{
        type:Sequelize.JSONB,
        defaultValue: "[{'0': 'You have installed GitQuest! The only achievement that truly matters.'}]"
    }
})

module.exports = Users
