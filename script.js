const codigoRastreio = document.querySelector('#codigoRastreio')
const btnBuscarRastreio = document.querySelector('#buscarRastreio')
const resultadoRastreio = document.querySelector('#resultadoRastreio')
const divContainer = document.querySelector('#containerRastreio')
let encomendas = []

// declarando os elementos que conterão os dados de rastreio
let dia = []
let hora = []
let local = []
let statusRastreio = []
let subStatus = []
let codigoEncomenda

// botão limpar
const btnLimpar = document.createElement('button')
btnLimpar.classList.add('button')
btnLimpar.innerHTML = 'Limpar'

let tentativas = 10
// botão responsável por chamar a função principal de buscar e exibir dados de rastreio
btnBuscarRastreio.addEventListener('click', function () {
    tentativas = 10
    if (!codigoRastreio.value) {
        alert('digite um valor válido')
    } else {
        const codigo = codigoRastreio.value
        buscarEncomendas(codigo)
        
    }
})



// FUNÇÃO PARA BUSCAR AS ENCOMENDAS
function buscarEncomendas(codigo) {
    let user = 'teste';
    let token = '1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f';
    let url = `https://api.linketrack.com/track/json?user=${user}&token=${token}&codigo=${codigo}`;
    codigoEncomenda = codigoRastreio.value

    // limpa o conteudo dos arrays, caso haja algum dado de um consulta passada
    LimparDadosArmazenados()

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
            if(tentativas > 0){
                setTimeout(()=> buscarEncomendas(codigo), 1200)
                tentativas --
            }else{
                console.log('Ops, não conseguimos rastrear sua encomenda. Verifique o código e tete novamente.')

            }            
        })
}


//cria a div que mostrará os dados de rastreio
let divCodigo = document.createElement("div")
divCodigo.setAttribute('id', 'produto-' + codigoEncomenda)

// FUNÇÃO PARA EXIBIR OS DADOS DO RASTREIO
function visualizarRastreio() {
    while (resultadoRastreio.firstChild) {
        resultadoRastreio.removeChild(resultadoRastreio.firstChild);
    }

    adicionarTitulos()

    // cria todos os elementos de status do rastreio dinâmicamente
    for (let i = 0; i < dia.length; i++) {
        adicionarConteudoRastreio(i)
    }

    document.body.style.justifyContent = 'flex-start';
    divContainer.appendChild(btnLimpar)
    divContainer.removeChild(btnBuscarRastreio)
    btnLimpar.addEventListener('click', limparRastreioAtual)
}






function limparRastreioAtual() {

    // remove todos os elementos que foram criado dinamicamente
    while (resultadoRastreio.firstChild) {
        resultadoRastreio.removeChild(resultadoRastreio.firstChild);
    }

    divContainer.removeChild(btnLimpar) // remove o botão limpar
    divContainer.appendChild(btnBuscarRastreio) // adiciona o botão remover

    document.body.style.justifyContent = 'center';

    // limpa o conteúdo armazenado nos elementos responsáveis por armazenar dados do rastreio
    codigoRastreio.value = ''
    LimparDadosArmazenados()
}

function LimparDadosArmazenados() {
    dia = []
    hora = []
    local = []
    statusRastreio = []
    subStatus = []
}

function adicionarConteudoRastreio(i) {
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

function adicionarTitulos() {
    // o título da div sera criado dinâmicamente com o codigo de rastreio
    let codigoDoProduto = document.createElement('h1')
    codigoDoProduto.classList.add('tituloRastreio')

    codigoDoProduto.textContent = codigoEncomenda //atribui o título ao h1

    // adiciona o titulo a div do produto pesquisado
    divCodigo.appendChild(codigoDoProduto)

    let divAdicionarTitulo = document.createElement('div')
    divAdicionarTitulo.setAttribute('id', 'divAdicionarTitulo')

    //label para o titulo adicionado pelo usuario
    let lblTituloEncomenda = document.createElement('label')
    lblTituloEncomenda.setAttribute('for', 'tituloEncomenda')
    lblTituloEncomenda.setAttribute('id', 'lblTituloEncomenda')
    lblTituloEncomenda.innerHTML = 'Insira um nome para esta encomenda, caso deseje salvar.'

    //cria um input para adicionar um título da escolha do usuário
    let tituloEncomenda = document.createElement('input')
    tituloEncomenda.setAttribute('type', 'text')
    tituloEncomenda.setAttribute('name', 'tituloEncomenda')
    tituloEncomenda.setAttribute('id', 'tituloEncomenda')

    divAdicionarTitulo.appendChild(lblTituloEncomenda)
    divAdicionarTitulo.appendChild(tituloEncomenda)

    divCodigo.appendChild(divAdicionarTitulo)

    // adiciona a div do produto criada dinâmicamente à div já presente no html
    resultadoRastreio.appendChild(divCodigo)
}