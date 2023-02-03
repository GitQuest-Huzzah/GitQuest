const Sequelize = require('sequelize')
const db = require('../db.js');

const GoldLog = db.define("goldlog", {
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    valueChange:{
        type:Sequelize.STRING,
        allowNull:false
    },
})
// Quest log needs:
// Discription of transfer (*blank* has given you *amount* 
// gold!, Your level up has given you 250 gold, You have given *name* *amount* gold! You got this amount of gold from Quest)
// incriment or decritment value ( -200, +250, -1000, +3000 )
// User has one gold log // gold log has many users
// 

module.exports = GoldLog

