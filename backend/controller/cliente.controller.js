const Cliente = require('../models/Cliente')
const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.nome || !valores.email || !valores.senha || !valores.cpf || !valores.telefone){
        return res.status(400).json({message: 'todos os campos são obrigatórios'})
    }

    if(valores.cpf.length !== 11){
        return res.status(400).json({message: 'tamanho invalido'})
    }

    try{
        const senhaCripto = cryptoJs.AES.encrypt(valores.senha,CHAVE_SECRETA).toString()
        const cpfCripto = cryptoJs.AES.encrypt(valores.cpf,CHAVE_SECRETA).toString()

        await Cliente.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCripto,
            cpf: cpfCripto,
            telefone: valores.telefone
        })
        res.status(201).json({message: 'dados cadastrados'})
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

const apagar = async(req,res)=>{
    const id = req.params.id
    try{
        const dados = await Cliente.findByPk(id)
        if(!dados){
            return res.status(404).json({message: 'não encontrado'})
        }
        await Cliente.destroy({where: {codCliente: id}})
        res.status(200).json({message:'apagado com sucesso'})
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

module.exports = {cadastrar,apagar}