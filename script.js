const codigoRastreio = document.querySelector('#codigoRastreio')
const btnBuscarRastreio = document.querySelector('#buscarRastreio')


let dia = []
let hora = []
let local = []
let statusRastreio = []
let subStatus = []


btnBuscarRastreio.addEventListener('click', function () {
    if (!codigoRastreio.value) {
        alert('digite um valor válido')
    } else {
        const codigo = codigoRastreio.value
        buscarEncomendas(codigo)
    }
    console.log(dia)
    console.log(hora)
    console.log(local)
    console.log(statusRastreio)
    console.log(subStatus)

})




function buscarEncomendas(codigo) {
    let user = 'teste';
    let token = '1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f';
    let url = `https://api.linketrack.com/track/json?user=${user}&token=${token}&codigo=${codigo}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let eventos = data.eventos
            let codigo = data.codigo

            eventos.map((evento) => {
                dia.push(evento.data)
                hora.push(evento.hora)
                local.push(evento.local)
                statusRastreio.push(evento.status)
                subStatus.push(evento.subStatus)
            })
        })
        .catch(error => {
            console.error(error);
            buscarEncomendas(codigo);
        })
}
