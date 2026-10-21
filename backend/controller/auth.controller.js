const Cliente = require('../models/Cliente')
const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const logar = async(req,res)=>{
    const valores = req.body

    if(!valores.email || !valores.senha){
        return res.status(400).json({message: 'todos os campos são obrigatórios'})
    }

    try{
        const cliente = await Cliente.findOne({where: {email: valores.email}})
        if(!cliente){
            return res.status(404).json({message: 'não encontrado'})
        }

        const bytes = cryptoJs.AES.decrypt(cliente.senha, CHAVE_SECRETA)
        const senhaDecript = bytes.toString(cryptoJs.enc.Utf8)

        if(valores.senha !== senhaDecript){
            return res.status(401).json({message: 'senha invalida'})
        }

        const tempoEmMs = 2 * 60 * 60 * 1000
        const tempoExpira = Date.now() + tempoEmMs

        const payload = {
            idCliente: cliente.codCliente,
            nome: cliente.nome,
            expiraEm: tempoExpira
        }

        const token = cryptoJs.AES.encrypt(JSON.stringify(payload),CHAVE_SECRETA).toString()

        res.status(200).json({message: 'logado com sucesso',token: token, nome: cliente.nome  })
    }catch(err){
        res.status(500).json({message: 'erro    '})
    }
}

module.exports = {logar}