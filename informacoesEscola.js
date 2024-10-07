

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
    Você sabia que a escola possui aproximadamente <span style="color: ${corAleatoria};">2.000 alunos</span>? Dentre esses, cerca de <span style="color: ${corAleatoria};">${alunosConectados} alunos</span> estão ativos em redes sociais. <br>
    Em média, cada aluno dedica cerca de <span style="color: ${corAleatoria};">${horas} horas</span> e <span style="color: ${corAleatoria};">${minutos} minutos</span> por dia navegando nessas plataformas. <br>
    Isso representa aproximadamente <span style="color: ${corAleatoria};">${porcentagemConectada}%</span> dos alunos da escola conectados às redes sociais.
`;



    const container = document.getElementById('graficos-container')
    container.appendChild(paragrafo)
}

vizualizarInformacoesGlobais()
