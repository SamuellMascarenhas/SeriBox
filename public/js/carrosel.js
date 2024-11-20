// URL da API do The Movie DB para obter as séries populares. 
// A URL inclui a chave da API, o idioma (português do Brasil) e a página 1 dos resultados.
const apiUrl = 'https://api.themoviedb.org/3/tv/top_rated?api_key=59eac9a58139309f3425af18ab34638c&language=pt-BR&page=1&sort_by=popularity.desc'; // Atualize com a chave da API

// Token de autenticação utilizado para acessar a API.
// Substitua pelo seu token de autenticação pessoal.
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OWVhYzlhNTgxMzkzMDlmMzQyNWFmMThhYjM0NjM4YyIsIm5iZiI6MTczMTk1MzU1Ny42Nzg5NjcsInN1YiI6IjY3M2I4MmEyNzNhNDVlNTE4NGJmYjc5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yGE05VSXU-NIZTLc9n8iFq1hhecU2VUYKoLDfFzBf2M';  // Substitua pelo seu token

// Função assíncrona para obter a lista de séries populares da API
async function obterSeriesPopulares() {
    try {
        // Realiza a requisição GET para a API, enviando o token de autenticação nos cabeçalhos
        const response = await fetch(apiUrl, {
            method: 'GET',  // Método de requisição GET
            headers: {
                'Authorization': `Bearer ${token}`,  // Cabeçalho de autorização com o token Bearer
                'Accept': 'application/json'  // Cabeçalho para indicar que aceitamos resposta em JSON
            }
        });

        // Verifica se a resposta da API foi bem-sucedida (código HTTP 200)
        if (!response.ok) {
            // Caso contrário, lança um erro para indicar que houve um problema
            throw new Error('Erro ao buscar dados');
        }

        // Converte a resposta para JSON e armazena os dados
        const data = await response.json();
        
        // Chama a função para atualizar o carrossel com os dados das séries
        atualizarCarrossel(data.results); // Passa a lista de séries populares para a função de atualização do carrossel
    } catch (error) {
        // Em caso de erro na requisição ou processamento, exibe a mensagem de erro no console
        console.error("Erro ao obter dados:", error);
    }
}

// Função para atualizar o carrossel com os dados das séries populares
function atualizarCarrossel(series) {
    // Obtém os elementos do carrossel de itens e indicadores pela ID
    const carouselItems = document.getElementById('carouselItems');
    const carouselIndicators = document.getElementById('carouselIndicators');

    // Limpa os itens e indicadores anteriores do carrossel
    carouselItems.innerHTML = '';
    carouselIndicators.innerHTML = '';

    // Itera sobre cada série recebida da API para atualizar o carrossel
    series.forEach((serie, index) => {
        // Se for o primeiro item da lista, marca como "ativo" para exibição inicial
        const ativo = index === 0 ? 'active' : ''; 

        // Cria o HTML para o item do carrossel, incluindo imagem, título e descrição da série
        const itemCarrossel = `
            <div class="carousel-item ${ativo}" onclick="redirecionarParaDetalhes(${serie.id})">
                <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" class="d-block w-100" alt="${serie.name}">
                <div class="fade-overlay"></div>  <!-- Efeito de sobreposição para estilização -->
                <div class="carousel-caption d-none d-md-block">
                    <h5>${serie.name}</h5>  <!-- Nome da série -->
                    <p>${serie.overview}</p>  <!-- Resumo da série -->
                </div>
            </div>
        `;
        // Adiciona o item do carrossel ao HTML
        carouselItems.innerHTML += itemCarrossel;

        // Se for o primeiro indicador, marca como "ativo" para destacá-lo
        const indicadorAtivo = index === 0 ? 'active' : '';
        
        // Cria o HTML para o indicador do carrossel, que permite a navegação entre os itens
        const indicador = `
            <li data-bs-target="#seriesCarousel" data-bs-slide-to="${index}" class="${indicadorAtivo}"></li>
        `;
        // Adiciona o indicador ao HTML
        carouselIndicators.innerHTML += indicador;
    });
}

// Função para redirecionar para a página de detalhes de uma série
function redirecionarParaDetalhes(id) {
    // Redireciona o usuário para a página de detalhes da série, passando o ID como parâmetro na URL
    window.location.href = `../details/detalhes-serie.html?id=${id}`;
}

// Chama a função para carregar as séries populares assim que o script for executado
obterSeriesPopulares();
