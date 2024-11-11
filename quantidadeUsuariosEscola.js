import { getCSS, tickConfig } from "./common.js";

async function quantidadeUsuariosPorRede() {
    // Dados ajustados para a escola com 1509 alunos, baseados em estimativas para Curitiba
    const dadosEscola = {
        "Facebook": 400,     // Uso ainda significativo entre algumas faixas etárias
        "Instagram": 1100,   // Muito popular, especialmente entre os mais jovens
        "Twitter": 350,      // Menos popular, mas com um público fiel
        "TikTok": 800,       // Crescimento rápido, especialmente entre adolescentes
        "WhatsApp": 1400,    // Extremamente popular para comunicação entre amigos e familiares
        "YouTube": 1000,     // Plataforma muito usada, especialmente para vídeos e educação
    };

    const totalAlunos = 1509;
    const alunosConectados = 1506;  // Agora estamos considerando que 1506 alunos estão conectados
    const horas = 4;                // Exemplo de horas
    const minutos = 30;             // Exemplo de minutos

    // Calcular a porcentagem de alunos conectados
    const porcentagemConectada = (alunosConectados / totalAlunos) * 100; // Percentual de alunos conectados

    // Limitar o número de usuários em cada rede social para o máximo de 1509 (número total de alunos)
    Object.keys(dadosEscola).forEach(key => {
        if (dadosEscola[key] > totalAlunos) {
            dadosEscola[key] = totalAlunos;  // Garantir que nenhuma rede tenha mais de 1509 usuários
        }
    });

    // Ordenar os dados pela quantidade de usuários em ordem decrescente
    const ordenados = Object.entries(dadosEscola).sort((a, b) => b[1] - a[1]);
    const nomeDasRedes = ordenados.map(item => item[0]);
    const quantidadeDeUsuarios = ordenados.map(item => item[1]);

    // Definindo a cor para destacar
    const highlightColor = getCSS('--highlight-color');  // Usando a cor definida em CSS

    // Adicionar texto explicativo
    const paragrafo = document.createElement('p');
    paragrafo.classList.add('graficos-container__texto');
    paragrafo.innerHTML = `
        Você sabia que a escola possui exatamente <span style="color: ${highlightColor};">1.509 alunos</span>? Dentre esses, cerca de <span style="color: ${highlightColor};">${alunosConectados}</span> alunos estão ativos em redes sociais. <br>
        Em média, cada aluno gasta aproximadamente <span style="color: ${highlightColor};">${horas} horas</span> e <span style="color: ${highlightColor};">${minutos} minutos</span> por dia navegando nessas plataformas. <br>
        Isso representa aproximadamente <span style="color: ${highlightColor};">${porcentagemConectada.toFixed(2)}%</span> dos alunos da escola conectados às redes sociais.
    `;

    const container = document.getElementById('graficos-container');
    container.appendChild(paragrafo);

    // Gráfico de Pizza
    const dataPizza = [
        {
            labels: nomeDasRedes,
            values: quantidadeDeUsuarios,
            type: 'pie',
            textinfo: 'label+percent',
            insidetextorientation: 'horizontal',
            textposition: 'inside',
            marker: {
                colors: ['#3a3a3a', '#545454', '#6f6f6f', '#8c8c8c', '#a9a9a9', '#c5c5c5'] // Cores em tons de cinza
            },
            hoverinfo: 'label+percent',
        }
    ];

    const layoutPizza = {
        title: {
            text: 'Preferência das redes sociais',
            font: {
                color: getCSS('--primary-color'),
                size: 30,
                family: getCSS('--font')
            }
        },
        showlegend: true,
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        height: 600,
        width: 800,
    };

    const graficoPizza = document.createElement('div');
    graficoPizza.className = 'grafico';
    graficoPizza.style.display = 'flex';
    graficoPizza.style.justifyContent = 'center'; // Centraliza o gráfico
    container.appendChild(graficoPizza);
    Plotly.newPlot(graficoPizza, dataPizza, layoutPizza);

    // Gráfico de Barras
    const dataBarra = [
        {
            x: nomeDasRedes,
            y: quantidadeDeUsuarios,
            type: 'bar',
            marker: {
                color: ['#3a3a3a', '#545454', '#6f6f6f', '#8c8c8c', '#a9a9a9', '#c5c5c5'] // Cores em tons de cinza
            }
        }
    ];

    const layoutBarra = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        title: {
            text: 'Redes sociais com mais usuários entre alunos',
            x: 0,
            font: {
                color: getCSS('--primary-color'),
                size: 30,
                family: getCSS('--font')
            }
        },
        xaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Nome das redes',
                font: {
                    color: getCSS('--secondary-color')
                }
            }
        },
        yaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Número de usuários',
                font: {
                    color: getCSS('--secondary-color')
                }
            },
            range: [0, totalAlunos] // Definindo o range do eixo Y para ir de 0 ao total de alunos
        }
    };

    const graficoBarra = document.createElement('div');
    graficoBarra.className = 'grafico';
    container.appendChild(graficoBarra);
    Plotly.newPlot(graficoBarra, dataBarra, layoutBarra);
}

quantidadeUsuariosPorRede();
