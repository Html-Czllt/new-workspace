

const url = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/dados-globais.json'

async function vizualizarInformacoesGlobais() {
    const res = await fetch(url)
    const dados = await res.json()
    const pessoasConectadas = (dados.total_pessoas_conectadas / 1e9)
    const pessoasNoMundo = (dados.total_pessoas_mundo / 1e9)
    const horas = parseInt(dados.tempo_medio)
    const minutos = Math.round((dados.tempo_medio - horas) * 100)
    const porcentagemConectada = ((pessoasConectadas / pessoasNoMundo ) * 100).toFixed(2)

    const paragrafo = document.createElement('p')
    paragrafo.classList.add('graficos-container__texto')
    paragrafo.innerHTML = `
    Você sabia que a população mundial é de cerca de <span>${pessoasNoMundo} bilhões</span> de indivíduos? Dentre eles, aproximadamente <span>${pessoasConectadas} bilhões</span> estão ativos em redes sociais. <br>
    Em média, cada pessoa passa cerca de <span>${horas} horas</span> e <span>${minutos} minutos</span> diariamente navegando nessas plataformas.<br>
    Isso equivale a aproximadamente <span>${porcentagemConectada}%</span> da população global conectada às redes sociais.
`;



    const container = document.getElementById('graficos-container')
    container.appendChild(paragrafo)
}

vizualizarInformacoesGlobais()
