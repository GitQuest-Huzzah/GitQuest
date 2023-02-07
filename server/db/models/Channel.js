const Sequelize = require('sequelize')
const db = require('../db.js');

const Channel = db.define("channel", {
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    slackID:{
        type:Sequelize.STRING,
        allowNull:false
    },
})

module.exports = Channel;
