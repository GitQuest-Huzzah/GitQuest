
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
    commitLevel:{
        // null
   },
    pullRequestLevel:{
        150
    }
    userID
})

//Write achievements

module.exports = Achievements


//
//
//
//
//
//
//
