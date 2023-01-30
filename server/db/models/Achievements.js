
const Sequelize = require('sequelize')
const db = require('../db');

const Achievements = db.define("achievement", {
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.TEXT,
        allowNull:false,
    },
    expValue:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    goldValue:{
        type:Sequelize.INTEGER,
    },
    rewardGold:{
        type:Sequelize.INTEGER,
    },
})

//Write achievements

module.exports = Achievements
