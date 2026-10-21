const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Drone = db.define('Drone',{
    codDrone:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modelo:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    marca:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    numSerie:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipo:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    idCliente:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            key: 'codCliente',
            model: 'Cliente'
        }
    }
},{
    timestamps: false,
    tableName: 'Drone'
})

module.exports = Drone