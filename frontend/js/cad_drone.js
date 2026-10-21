const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html  '
}

const resposta = document.getElementById('resposta')
const btn = document.getElementById('btn')

btn.addEventListener('click',(e)=>{
    e.preventDefault()

    const valores = {
        modelo: document.getElementById('modelo').value,
        marca: document.getElementById('marca').value,
        numSerie: Number(document.getElementById('numSerie').value),
        tipo: document.getElementById('tipo').value,
        idCliente: Number(document.getElementById('idCliente').value)
    }

    fetch('http://localhost:3000/drone',{
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