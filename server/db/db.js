const Sequelize = require("sequelize");

//create database link between sequelize and PG
// const db = new Sequelize('postgres://zmmkxuoxkjdqwa:e282aae775524e3021060733969adf661dafd0bf8768e133dd0b999b3be5bfad@ec2-3-209-124-113.compute-1.amazonaws.com:5432/d4bg5b9n50ereq', {ssl:true});

const db = new Sequelize({
  database:'d4bg5b9n50ereq',
  username: "zmmkxuoxkjdqwa",
  password: "e282aae775524e3021060733969adf661dafd0bf8768e133dd0b999b3be5bfad",
    host: "ec2-3-209-124-113.compute-1.amazonaws.com",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false // This line will fix new error
    }
  },
});

db.sync()
module.exports = db;
