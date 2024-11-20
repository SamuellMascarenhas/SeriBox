// Sua chave da API The Movie DB
const apiKey = '59eac9a58139309f3425af18ab34638c'; // Chave para autenticação na API do The Movie DB

// URLs das APIs para buscar informações sobre séries e filmes
const apiUrl5 = 'https://api.themoviedb.org/3/search/tv'; // URL para pesquisar séries
const apiUrl6 = 'https://api.themoviedb.org/3/discover/tv'; // URL para descobrir séries
const apiUrl7 = 'https://api.themoviedb.org/3/trending/all/day'; // URL para filmes e séries em alta

// Função para carregar séries e filmes populares ao carregar a página
async function carregarSeriesEFimesPopulares() {
    try {
        // Requisição para obter filmes populares
        const responseFilmes = await fetch(`${apiUrl7}?api_key=${apiKey}&language=pt-BR&page=1`);
        const filmesData = await responseFilmes.json(); // Converte a resposta da requisição para um objeto JSON

        // Requisição para obter séries populares
        const responseSeries = await fetch(`${apiUrl6}?api_key=${apiKey}&language=pt-BR&page=1`);
        const seriesData = await responseSeries.json(); // Converte a resposta da requisição para um objeto JSON

        // Combina os resultados de filmes e séries
        const todos = [...filmesData.results, ...seriesData.results];

        // Limita a exibição a 10 resultados
        const resultados = todos.slice(0, 10);

        // Exibe os resultados no DOM
        exibirCards(resultados);
    } catch (error) {
        // Caso ocorra algum erro, exibe uma mensagem de erro
        console.error('Erro ao carregar séries e filmes populares:', error);
        alert('Erro ao carregar séries e filmes populares. Tente novamente mais tarde.');
    }
}

// Função para pesquisar séries com base no texto inserido
async function pesquisarSeries() {
    const searchQuery = document.getElementById('searchInput').value; // Obtém o texto digitado na caixa de pesquisa

    // Verifica se o campo de pesquisa está vazio
    if (!searchQuery) {
        alert('Por favor, digite o nome de uma série.');
        return;
    }

    try {
        // Requisição para buscar séries com o texto de pesquisa
        const response = await fetch(`${apiUrl5}?api_key=${apiKey}&query=${searchQuery}&language=pt-BR`);
        const data = await response.json();

        // Verifica se retornou resultados
        if (data.results && data.results.length > 0) {
            exibirCards(data.results.slice(0, 10)); // Exibe os 10 primeiros resultados
        } else {
            alert('Nenhuma série encontrada!');
        }
    } catch (error) {
        console.error('Erro ao buscar séries:', error);
        alert('Erro ao buscar séries. Tente novamente mais tarde.');
    }
}

// Função para filtrar séries com base nos filtros e no texto inserido
async function filtrarSeries() {
    const searchQuery = document.getElementById('searchInput').value; // Obtém o texto de pesquisa
    const genre = document.getElementById('genreFilter').value; // Obtém o gênero selecionado
    const year = document.getElementById('yearFilter').value; // Obtém o ano de lançamento selecionado
    const rating = document.getElementById('ratingFilter').value; // Obtém a classificação selecionada

    // Verifica se pelo menos um filtro foi selecionado
    if (!searchQuery && !genre && !year && !rating) {
        alert('Por favor, insira algum filtro para pesquisa.');
        return;
    }

    try {
        // Monta a URL da requisição com base nos filtros selecionados
        let url = `${apiUrl6}?api_key=${apiKey}&language=pt-BR&query=${searchQuery}`;

        if (genre) {
            url += `&with_genres=${genre}`; // Adiciona o filtro de gênero à URL
        }

        if (year) {
            url += `&first_air_date_year=${year}`; // Adiciona o filtro de ano à URL
        }

        if (rating) {
            url += `&certification_country=US&certification=${rating}`; // Adiciona o filtro de classificação à URL
        }

        // Requisição à API para buscar séries com os filtros aplicados
        const response = await fetch(url);
        const data = await response.json();

        // Verifica se retornou resultados
        if (data.results && data.results.length > 0) {
            exibirCards(data.results.slice(0, 10)); // Exibe os 10 primeiros resultados
        } else {
            alert('Nenhuma série encontrada com os filtros aplicados!');
        }
    } catch (error) {
        console.error('Erro ao buscar séries:', error);
        alert('Erro ao buscar séries. Tente novamente mais tarde.');
    }
}

// Função para exibir os cards das séries
function exibirCards(series) {
    const cardsContainer = document.getElementById('cardsContainer'); // Contêiner onde os cards serão exibidos
    cardsContainer.innerHTML = ''; // Limpa os cards existentes

    // Verifica se a lista de séries está vazia
    if (!series || series.length === 0) {
        cardsContainer.innerHTML = '<p>Nenhuma série encontrada.</p>';
        return;
    }

    // Gera um card para cada série
    series.forEach(serie => {
        // Verifica se a imagem do poster existe, caso contrário, usa uma imagem padrão
        const imageUrl = serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : 'url-da-imagem-padrao.jpg';

        // Verifica se o título da série (nome) existe, caso contrário, usa um título padrão
        const title = serie.name ? serie.name : 'Título não disponível';

        // Verifica se a descrição existe, caso contrário, exibe uma mensagem padrão
        const description = serie.overview ? serie.overview.substring(0, 100) + '...' : 'Sem descrição';

        // Gera o HTML do card
        const cardHtml = `
            <div class="col-md-4 mb-4">
                <div class="card-explorer">
                    <img src="${imageUrl}" class="card-img-top" alt="${title}">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description}</p>
                        <a href="../details/detalhes-serie.html?id=${serie.id}" class="btn btn-primary">Ver Detalhes</a>
                    </div>
                </div>
            </div>
        `;
        // Adiciona o card ao contêiner
        cardsContainer.innerHTML += cardHtml;
    });
}

// Carrega séries e filmes populares ao carregar a página
window.onload = carregarSeriesEFimesPopulares;
