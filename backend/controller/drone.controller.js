const Drone = require('../models/Drone')
const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.modelo || !valores.marca || !valores.numSerie || !valores.tipo || !valores.idCliente){
        return res.status(400).json({message: 'todos os campos são obrigatórios'})
    }

    try{
        const numSerieCripto = cryptoJs.AES.encrypt(valores.numSerie,CHAVE_SECRETA).toString()

        await Drone.create({
            modelo: valores.modelo,
            marca: valores.marca,
            numSerie: numSerieCripto,
            tipo: valores.tipo,
            idCliente: valores.idCliente
        })
        res.status(201).json({message: 'dados cadastrados'})
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

module.exports = {cadastrar}