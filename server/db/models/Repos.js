const Sequelize = require('sequelize')
const db = require('../db.js');
const Users = db.define("user", {
    repoId:{
        type:Sequelize.STRING,
        allowNull:false
    },
    repoName:{
        type:Sequelize.STRING,
        allowNull:false
    },
})

module.exports = Users
