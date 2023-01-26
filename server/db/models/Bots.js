const Sequelize = require('sequelize')
const db = require('../db');

const Bots = db.define("bot", {
    token:{
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
    }
})

Bots.create({
    token:'oiajwodijawo',
    teamID:'oijweoifj', 
    teamName:"oiajwdion"
})

module.exports = Bots
