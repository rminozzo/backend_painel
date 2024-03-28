const Sequelize = require('sequelize');

const db = require('./db');

const Alarmes = db.define('alarmes',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    interface:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    ip_switch:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cidade:{
        type: Sequelize.STRING,
        allowNull: true
    },
    status:{
        type: Sequelize.STRING,
        allowNull: true
    },
    data_alarme:{
        type: Sequelize.STRING,
        allowNull: false
    },
    observacao:{
        type: Sequelize.STRING,
        allowNull: false
    },

});

Alarmes.sync();

module.exports = Alarmes;


