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
    isWebhook:{
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: false
    }
})

module.exports = Repos
