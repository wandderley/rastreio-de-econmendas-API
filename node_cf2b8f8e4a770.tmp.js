// const codigoRastreio = document.querySelector('#codigoRastreio')
// const btnBuscarRastreio = document.querySelector('#buscarRastreio')

// btnBuscarRastreio.addEventListener('click', function () {
//     if(!codigoRastreio){
//         alert('digite um valor válido')
//     }else{
//         const codigo = codigoRastreio.value
//         buscarEncomendas(codigo)
//     }

// })

function buscarEncomendas(codigo) {
    // let user = 'teste';
    // let token = '1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f';
    // let url = `https://api.linketrack.com/track/json?user=${user}&token=${token}&codigo=${codigo}`;
    let user = 'teste';
    let token = '1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f';
    let url = `https://api.linketrack.com/track/json?user=${user}&token=${token}&codigo=${codigo}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição da API');
            }
            return response.json();
        })
        .then(data => {
            let eventos = data.eventos
            let codigo = data.codigo
            alert('deu certo')
            console.log(codigo);;
            console.log(eventos);

        })
        .catch(error => {
            console.error(error);
            buscarEncomendas(codigo)
        })
}

const codigo = 'NM479945411BR'

buscarEncomendas(codigo)

//NM479945411BR