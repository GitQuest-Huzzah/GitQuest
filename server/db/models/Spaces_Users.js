
const Sequelize = require('sequelize')
const db = require('../db');

const Spaces_Users = db.define("space_user", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    commits:{
        type:Sequelize.STRING,
    },
})

module.exports = Spaces_Users
