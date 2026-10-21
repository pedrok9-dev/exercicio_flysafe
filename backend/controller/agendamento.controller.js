const Cliente = require('../models/Cliente')
const Drone = require('../models/Drone')
const Agendamento = require('../models/Agendamento')
const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.data || !valores.hora || !valores.idCliente || !valores.idDrone){
        return res.status(400).json({message: 'todos os campos são obrigatórios'})
    }

    try{
        const cliente = await Cliente.findByPk(valores.idCliente)
        if(!cliente){
            return res.status(404).json({message: 'não encontrado'})
        } 
        const drone = await Drone.findByPk(valores.idDrone)
        if(!drone){
            return res.status(404).json({message: 'não encontrado'})
        } 

        const agendamento = await Agendamento.create(valores)
        return res.status(201).json({message: 'dados cadastrados',agendamento: agendamento})
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

module.exports = {cadastrar}