const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html  '
}

const resposta = document.getElementById('resposta')
const btn = document.getElementById('btn')

btn.addEventListener('click',(e)=>{
    e.preventDefault()

    const valores = {
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        idCliente: Number(document.getElementById('idCliente').value),
        idDrone: Number(document.getElementById('idDrone').value)
    }

    fetch('http://localhost:3000/agendamento',{
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization':token
        },
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ` `
        resposta.innerHTML += `<p>${dados.message}</p>`
        document.querySelector('form').reset()
    })
})