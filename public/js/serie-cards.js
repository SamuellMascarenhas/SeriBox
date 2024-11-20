// URL da API que retorna as séries "On The Air" (em exibição) da TMDb
const apiUrl2 = 'https://api.themoviedb.org/3/tv/on_the_air?api_key=59eac9a58139309f3425af18ab34638c&language=pt-BR&page=1'; // Atualize com sua chave da API

// Token de autenticação para acessar a API
const token2 = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OWVhYzlhNTgxMzkzMDlmMzQyNWFmMThhYjM0NjM4YyIsIm5iZiI6MTczMTk1MzU1Ny42Nzg5NjcsInN1YiI6IjY3M2I4MmEyNzNhNDVlNTE4NGJmYjc5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yGE05VSXU-NIZTLc9n8iFq1hhecU2VUYKoLDfFzBf2M';  // Substitua pelo seu token

// Elemento HTML onde os cards das séries serão exibidos
const container = document.getElementById('serie-cards');

// Função assíncrona para obter as séries mais recentes da API
async function obterSeriesRecentes() {
    try {
        // Realiza a requisição GET para a API usando o token de autenticação
        const response = await fetch(apiUrl2, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token2}`, // Envia o token no cabeçalho da requisição
                'Accept': 'application/json' // Especifica que a resposta será em formato JSON
            }
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao buscar dados'); // Lança um erro se a resposta não for OK
        }

        // Converte a resposta para JSON
        const data = await response.json();
        console.log('Resposta da API:', data); // Imprime no console os dados retornados pela API

        // Pega as 3 primeiras séries da resposta
        const series = data.results.slice(0, 3);  // Pegando apenas as 3 primeiras séries

        // Verifica se há séries para exibir
        if (series && series.length > 0) {
            exibirCards(series);  // Chama a função para exibir os cards
        } else {
            console.log('Nenhuma série encontrada.'); // Caso não haja séries, exibe mensagem no console
            container.innerHTML = '<p>Nenhuma série encontrada.</p>'; // Exibe uma mensagem no HTML
        }
    } catch (error) {
        // Captura qualquer erro durante o processo de obtenção dos dados
        console.error("Erro ao obter dados:", error); // Exibe o erro no console
        container.innerHTML = '<p>Houve um problema ao carregar as séries. Tente novamente mais tarde.</p>'; // Exibe mensagem de erro no HTML
    }
}

// Função para exibir os cards das séries na página
function exibirCards(series) {
    // Verifica se a lista de séries está vazia
    if (!series || series.length === 0) {
        container.innerHTML = '<p>Nenhuma série disponível no momento.</p>'; // Exibe mensagem de erro caso não haja séries
        return;
    }

    // Itera sobre cada série para criar um card
    series.forEach(serie => {
        // Define a URL da imagem de capa da série (caso não exista, usa uma imagem padrão)
        const imgUrl = serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : '../assets/img/img-series/imagem_default.jpg';

        // Cria um novo elemento div para o card da série
        const card = document.createElement('div');
        card.classList.add('col-md-4'); // Adiciona a classe de estilo para o card responsivo

        // Adiciona o conteúdo HTML do card (imagem, título, descrição e link para mais detalhes)
        card.innerHTML = `
            <div class="card">
                <img src="${imgUrl}" class="card-img-top" alt="${serie.name}"> <!-- Imagem da série -->
                <div class="card-body">
                    <h5 class="card-title">${serie.name}</h5> <!-- Título da série -->
                    <p class="card-text">${serie.overview || 'Sem descrição disponível.'}</p> <!-- Descrição da série, caso não exista, exibe uma mensagem padrão -->
                    <a href="../details/detalhes-serie.html?id=${serie.id}" class="btn btn-primary">Saiba Mais</a> <!-- Botão para redirecionar para a página de detalhes -->
                </div>
            </div>
        `;

        // Adiciona o card à área de exibição
        container.appendChild(card);
    });
}

// Aguarda o carregamento do conteúdo HTML antes de rodar a função de obter séries
document.addEventListener('DOMContentLoaded', function () {
    if (container) {
        obterSeriesRecentes();  // Chama a função para obter as séries assim que o conteúdo é carregado
    } else {
        console.error('Elemento #serie-cards não encontrado no DOM.'); // Exibe um erro caso o elemento não exista
    }
});
