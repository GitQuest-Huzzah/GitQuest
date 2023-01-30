const Sequelize = require('sequelize')
const db = require('../db');

const Workspaces = db.define("workspace", {
    botToken:{
        type:Sequelize.STRING,
        allowNull:false
    },
    teamID:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    teamName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    repoName:{
        type:Sequelize.STRING,
    },
    orgName:{
        type:Sequelize.STRING,
    },
    repoID:{
        type:Sequelize.INTEGER,
    }
})

module.exports = Workspaces
