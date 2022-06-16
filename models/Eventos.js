const Sequelize = require('sequelize');

const db = require('./db');

const Evento = db.define('eventos',{
    id_evento:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    status_evento:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    cidade_evento:{
        type: Sequelize.STRING,
        allowNull: false
    },
    ponto_evento:{
        type: Sequelize.STRING,
        allowNull: true
    },
    energia_evento:{
        type: Sequelize.STRING,
        allowNull: true
    },
    endereco_evento:{
        type: Sequelize.STRING,
        allowNull: false
    },
    afeta_evento:{
        type: Sequelize.STRING,
        allowNull: true
    },
    data_evento:{
        type: Sequelize.STRING,
        allowNull: false
    },
    protocolo_evento:{
        type: Sequelize.STRING,
        allowNull: false
    },
    previsao_evento:{
        type: Sequelize.STRING,
        allowNull: false
    },

});

Evento.sync();

module.exports = Evento;


