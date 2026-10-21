const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Agendamento = db.define('Agendamento',{
    codAgendamento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data:{
        type: DataTypes.DATE,
        allowNull: false
    },
    hora:{
        type: DataTypes.TIME,
        allowNull: false
    },
    idCliente:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            key: 'codCliente',
            model: 'Cliente'
        }
    },
    idDrone:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            key: 'codDrone',
            model: 'Drone'
        }
    }
},{
    timestamps: false,
    tableName: 'Agendamento'
})

module.exports = Agendamento