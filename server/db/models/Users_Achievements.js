const Sequelize = require('sequelize')
const db = require('../db');

const Users_Achievements = db.define("users_achievement", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
})

module.exports = Users_Achievements
