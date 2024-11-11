import { getCSS, tickConfig } from "./common.js";

async function quantidadeUsuariosPorRede() {
    const url = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/numero-usuarios.json';

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Erro ao buscar dados: ' + res.statusText);
        
        const dados = await res.json();
        const nomeDasRedes = Object.keys(dados);
        const quantidadeDeUsuarios = Object.values(dados);

        // Cores para os gráficos em tons de cinza
        const cores = ['#3a3a3a', '#545454', '#6f6f6f', '#8c8c8c', '#a9a9a9', '#c5c5c5'];

        // Gráfico de Barras
        const dataBarra = [
            {
                x: nomeDasRedes,
                y: quantidadeDeUsuarios,
                type: 'bar',
                marker: {
                    color: cores //// Usando as cores definidas ////
                }
            }
        ];

      //  // Gráfico de Pizza ////
        const dataPizza = [
            {
                labels: nomeDasRedes,
                values: quantidadeDeUsuarios,
                type: 'pie',
                textinfo: 'label+percent',
                insidetextorientation: 'horizontal',
                textposition: 'inside',
                marker: {
                    colors: cores //// Usando as mesmas cores ////
                },
                hoverinfo: 'label+percent',
            }
        ];

        const layoutPizza = {
            title: {
                text: 'Preferência das redes sociais',
                font: {
                    color: getCSS('--highlight-color'),
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
        graficoPizza.style.justifyContent = 'center'; //// Centraliza o gráfico ////
        document.getElementById('graficos-container').appendChild(graficoPizza);
        Plotly.newPlot(graficoPizza, dataPizza, layoutPizza);

       // // Layout do Gráfico de Barras ////
        const layoutBarra = {
            plot_bgcolor: getCSS('--bg-color'),
            paper_bgcolor: getCSS('--bg-color'),
            title: {
                text: 'Redes sociais com mais usuários entre alunos',
                font: {
                    color: getCSS('--highlight-color'),
                    size: 30,
                    family: getCSS('--font')
                }
            },
            xaxis: {
                tickfont: tickConfig,
                title: {
                    text: 'Nome das redes sociais',
                    font: {
                        color: getCSS('--highlight-color')
                    }
                }
            },
            yaxis: {
                tickfont: tickConfig,
                title: {
                    text: 'Número de usuários   ',
                    font: {
                        color: getCSS('--highlight-color')
                    }
                }
            }
        };

        const graficoBarra = document.createElement('div');
        graficoBarra.className = 'grafico';
        document.getElementById('graficos-container').appendChild(graficoBarra);
        Plotly.newPlot(graficoBarra, dataBarra, layoutBarra);
        
    } catch (error) {
        console.error('Erro:', error);
    }
}

quantidadeUsuariosPorRede();
