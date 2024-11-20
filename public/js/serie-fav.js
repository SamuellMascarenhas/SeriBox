// URL da API que retorna as séries favoritas armazenadas no JSONServer
const apiUrl4 = 'http://localhost:3001/series_favoritas'; // URL do JSONServer

// Função assíncrona para carregar as séries favoritas
async function carregarSeriesFavoritas() {
    try {
        // Realiza a requisição para a API para obter as séries favoritas
        const response = await fetch(apiUrl4);

        // Verifica se a resposta foi bem-sucedida (status HTTP 200)
        if (!response.ok) {
            throw new Error('Erro ao obter os dados das séries favoritas.'); // Lança um erro se a resposta não for bem-sucedida
        }

        // Converte a resposta para JSON
        const series = await response.json();

        // Obtém o elemento HTML onde os cards das séries serão exibidos
        const container = document.getElementById('seriesCardsContainer');

        // Exibe uma mensagem de carregamento enquanto os dados estão sendo processados
        container.innerHTML = '<p>Carregando séries...</p>';

        // Verifica se a lista de séries está vazia
        if (series.length === 0) {
            container.innerHTML = '<p>Você ainda não tem séries favoritas.</p>'; // Exibe uma mensagem caso o usuário não tenha séries favoritas
            return;
        }

        let cardsHtml = ''; // Variável para armazenar o HTML dos cards das séries
        // Itera sobre cada série e cria o HTML para exibir os cards
        series.forEach(serie => {
            // Verifica se a imagem e o nome estão disponíveis, caso contrário, usa valores padrão
            const imagem = serie.imagem || 'default-image.jpg'; // Imagem padrão caso não exista
            const nome = serie.nome || 'Nome desconhecido'; // Nome padrão caso não exista

            // Constrói o HTML do card da série
            cardsHtml += `
                <div class="col-md-4">
                    <div class="card">
                        <img src="${imagem}" class="card-img-top" alt="${nome}"> <!-- Imagem da série -->
                        <div class="card-body">
                            <h5 class="card-title">${nome}</h5> <!-- Nome da série -->
                            <p class="card-text">${serie.descricao}</p> <!-- Descrição da série -->
                            <a href="../details/detalhes-serie.html?id=${serie.id}" class="btn btn-primary">Ver Detalhes</a> <!-- Link para detalhes -->
                        </div>
                    </div>
                </div>
            `;
        });

        // Atualiza o conteúdo HTML do container com os cards gerados
        container.innerHTML = cardsHtml;

    } catch (error) {
        // Caso ocorra um erro ao fazer a requisição ou processar os dados, exibe uma mensagem de erro
        console.error('Erro:', error); // Log do erro no console para facilitar o debug
        // Exibe uma mensagem de erro no DOM
        document.querySelector('.my-series').innerHTML = '<p>Erro ao carregar as séries favoritas.</p>';
    }
}

// Evento para chamar a função carregarSeriesFavoritas assim que o conteúdo da página for carregado
document.addEventListener('DOMContentLoaded', carregarSeriesFavoritas);
