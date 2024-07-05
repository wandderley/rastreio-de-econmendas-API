const codigoRastreio = document.querySelector('#codigoRastreio')
const btnBuscarRastreio = document.querySelector('#buscarRastreio')
const resultadoRastreio = document.querySelector('#resultadoRastreio')
let encomendas = []

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

    // o título da div sera criado dinâmicamente com o codigo de rastreio
    let codigoDoProduto = document.createElement('h1')
    codigoDoProduto.textContent = codigoEncomenda //atrivui o título ao h1

    // adiciona o titulo a div do produto pesquisado
    divCodigo.appendChild(codigoDoProduto)
    // adiciona a div do produto criada dinâmicamente à div já presente no html
    resultadoRastreio.appendChild(divCodigo)


    // cria todos os elementos de status do rastreio dinâmicamente
    for (let i = 0; i < dia.length; i++) {
        // div onde estará contido cada bloco de atualização
        let divAtualizacaoRastreio = document.createElement('div')
        divAtualizacaoRastreio.classList.add('atualizacaoRastreio')

        // div do status do rastreio
        let divStatusRastreio = document.createElement('div')
        divStatusRastreio.setAttribute('id', 'divStatusRastreio')
        //<p> onde estará contido o retorno da api
        let contentStatusRastreio = document.createElement('p')
        contentStatusRastreio.classList.add('statusRastreio')
        contentStatusRastreio.innerHTML = `Staus: ${statusRastreio[i]}`
        // inserindo o parágrafo na div
        divStatusRastreio.appendChild(contentStatusRastreio)

        // div da data de atualização
        let divDataAtualizacao = document.createElement('div')
        divDataAtualizacao.setAttribute('id', 'divDataAtualizacao')
        //<p> onde estará contido o retorno da api
        let contentDataAtualizacao = document.createElement('p')
        contentDataAtualizacao.classList.add('dataAtualizacao')
        contentDataAtualizacao.innerHTML = `Data de atualização: ${dia[i]} às  ${hora[i]}`
        // inserindo o parágrafo na div
        divDataAtualizacao.appendChild(contentDataAtualizacao)

        /* div retorna o local atual do pacote rastreado
        let divLocal = document.createElement('div')
        let contentlocal = document.createElement('p')
        divLocal
        contentlocal.classList.add('localRastreio')
        contentlocal.innerHTML = `Local Atual: ${local[i]}`
        divLocal.appendChild(contentlocal)
        */

        // div do local
        let divOrigemDestino = document.createElement('div')
        divOrigemDestino.setAttribute('id', 'divOrigemDestino')
        //<p> onde estará contido o retorno da api
        let contentOrigemDestino = document.createElement('p')
        contentOrigemDestino.classList.add('origemDestino')
        contentOrigemDestino.innerHTML = `${subStatus[i]}`;
        // inserindo o parágrafo na div
        divOrigemDestino.appendChild(contentOrigemDestino)

        // inserindo as div de status, local e data na div que conterá as atualizações
        divAtualizacaoRastreio.appendChild(divStatusRastreio)
        divAtualizacaoRastreio.appendChild(divOrigemDestino)
        divAtualizacaoRastreio.appendChild(divDataAtualizacao)

        // inserindo a div com cada atualização na div pai presente no html
        divCodigo.appendChild(divAtualizacaoRastreio)
    }
}