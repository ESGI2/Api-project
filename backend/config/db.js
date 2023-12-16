const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({

    dialect: 'mysql',
    host     : process.env.DB_SERVER,
    username : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME

});


module.exports = sequelize;