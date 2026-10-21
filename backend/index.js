const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const clienteController = require('./controller/cliente.controller')
const authController = require('./controller/auth.controller')
const droneController = require('./controller/drone.controller')
const agendamentoController = require('./controller/agendamento.controller')
const authMiddleware = require('./middleware/auth.middleware')
require('./models/rel')
const hostname = 'localhost'
const PORT = 3000
//middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
//rotas públicas
app.post('/cliente',clienteController.cadastrar)
app.post('/login',authController.logar)

app.get('/',(req,res)=>{
    return res.status(200).json({message: 'rodando'})
})
//divisa
app.use(authMiddleware)
//rotas privadas
app.delete('/cliente/:id',clienteController.apagar)

app.post('/drone',droneController.cadastrar)

app.post('/drone',agendamentoController.cadastrar)
//server
conn.sync()

.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`servidor rodando em: http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('erro',err)
})