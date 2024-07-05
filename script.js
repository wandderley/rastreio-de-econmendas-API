const codigoRastreio = document.querySelector('#codigoRastreio')
const btnBuscarRastreio = document.querySelector('#buscarRastreio')
const resultadoRastreio = document.querySelector('#resultadoRastreio')


let dia = []
let hora = []
let local = []
let statusRastreio = []
let subStatus = []
let codigoEncomenda


btnBuscarRastreio.addEventListener('click', function () {
    if (!codigoRastreio.value) {
        alert('digite um valor válido')
    } else {
        const codigo = codigoRastreio.value
        buscarEncomendas(codigo)
    }
    // console.log(dia)
    // console.log(hora)
    // console.log(local)
    // console.log(statusRastreio)
    //console.log(subStatus)
})


function buscarEncomendas(codigo) {
    let user = 'teste';
    let token = '1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f';
    let url = `https://api.linketrack.com/track/json?user=${user}&token=${token}&codigo=${codigo}`;
    codigoEncomenda = codigoRastreio.value

    dia = []
    hora = []
    local = []
    statusRastreio = []
    subStatus = []

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let eventos = data.eventos

            eventos.map((evento) => {
                dia.push(evento.data)
                hora.push(evento.hora)
                local.push(evento.local)
                statusRastreio.push(evento.status)
                subStatus.push(evento.subStatus)
            })

            visualizarRastreio()

        })
        .catch(error => {
            console.error(error);
            buscarEncomendas(codigo);
        })
}

function visualizarRastreio() {
    while (resultadoRastreio.firstChild) {
        resultadoRastreio.removeChild(resultadoRastreio.firstChild);
    }

    //cria a div que mostrará os dados de rastreio
    let divCodigo = document.createElement("div")
    divCodigo.setAttribute('id', 'produto-' + codigoEncomenda)

    // resultadoRastreio.innerHTML = ' ';

    // o título da div sera criado dinâmicamente com o codigo de rastreio
    let codigoDoProduto = document.createElement('h1')
    codigoDoProduto.textContent = codigoEncomenda //atrivui o título ao h1

    // adiciona o titulo a div do produto pesquisado
    divCodigo.appendChild(codigoDoProduto)
    // adiciona a div do produto criada dinâmicamente à div já presente no html
    resultadoRastreio.appendChild(divCodigo)

    // cria todos os elementos de status do rastreio dinâmicamente
    for (let i = 0; i < dia.length; i++) {

        let divAtualizacaoRastreio = document.createElement('div')
        divAtualizacaoRastreio.classList.add('atualizacaoRastreio')

        let divDataAtualizacao = document.createElement('div')
        let contentDataAtualizacao = document.createElement('p')
        contentDataAtualizacao.innerHTML = `Data de atualização: ${dia[i]} às  ${hora[i]}`
        divDataAtualizacao.appendChild(contentDataAtualizacao)

        // let divDia = document.createElement("div")
        // let contentDia = document.createElement('p')
        // contentDia.innerHTML = dia[i]
        // divDia.appendChild(contentDia)

        // let divHora = document.createElement("div")
        // let contentHora = document.createElement('p')
        // contentHora.innerHTML = hora[i]
        // divHora.appendChild(contentHora)

        let divLocal = document.createElement('div')
        let contentlocal = document.createElement('p')
        contentlocal.innerHTML = `Local Atual: ${local[i]}`
        divLocal.appendChild(contentlocal)

        let divOrigemDestino = document.createElement('div')
        let contentOrigemDestino = document.createElement('p')
        contentOrigemDestino.innerHTML = `Origem: ${subStatus[i][0]}</br>${subStatus[i][1]}`
        divOrigemDestino.appendChild(contentOrigemDestino)


        let divStatusRastreio = document.createElement('div')
        let contentStatusRastreio = document.createElement('p')
        contentStatusRastreio.innerHTML = `Staus: ${statusRastreio[i]}`
        divStatusRastreio.appendChild(contentStatusRastreio)

        divAtualizacaoRastreio.appendChild(divStatusRastreio)
        divAtualizacaoRastreio.appendChild(divLocal)
        divAtualizacaoRastreio.appendChild(divOrigemDestino)
        divAtualizacaoRastreio.appendChild(divDataAtualizacao)

        // divCodigo.appendChild(divDia)
        // divCodigo.appendChild(divHora)

        divCodigo.appendChild(divAtualizacaoRastreio)
    }
}
