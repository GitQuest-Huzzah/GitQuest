const Sequelize = require('sequelize')
const db = require('../db.js');
const Repos = db.define("repo", {
    repoId:{
        type:Sequelize.STRING,
        allowNull:false
    },
    repoName:{
        type:Sequelize.STRING,
        allowNull:false
    },
})

module.exports = Repos
