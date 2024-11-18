const apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=59eac9a58139309f3425af18ab34638c&language=pt-BR&page=1&sort_by=popularity.desc'; // Atualize com a chave da API
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OWVhYzlhNTgxMzkzMDlmMzQyNWFmMThhYjM0NjM4YyIsIm5iZiI6MTczMTk1MzU1Ny42Nzg5NjcsInN1YiI6IjY3M2I4MmEyNzNhNDVlNTE4NGJmYjc5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yGE05VSXU-NIZTLc9n8iFq1hhecU2VUYKoLDfFzBf2M';  // Substitua pelo seu token

async function obterSeriesPopulares() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }

        const data = await response.json();
        atualizarCarrossel(data.results); // Passa os dados para atualizar o carrossel
    } catch (error) {
        console.error("Erro ao obter dados:", error);
    }
}

function atualizarCarrossel(series) {
    const carouselItems = document.getElementById('carouselItems');
    const carouselIndicators = document.getElementById('carouselIndicators');
    
    // Limpar os itens e indicadores anteriores, se existirem
    carouselItems.innerHTML = '';
    carouselIndicators.innerHTML = '';
    
    series.forEach((serie, index) => {
        const ativo = index === 0 ? 'active' : ''; // Marcar o primeiro item como ativo
        const itemCarrossel = `
            <div class="carousel-item ${ativo}">
                <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" class="d-block w-100" alt="${serie.title}">
                <div class="fade-overlay"></div>
                <div class="carousel-caption d-none d-md-block">
                    <h5>${serie.title}</h5>
                    <p>${serie.overview}</p>
                </div>
            </div>
        `;
        carouselItems.innerHTML += itemCarrossel;
        
        const indicadorAtivo = index === 0 ? 'active' : '';
        const indicador = `
            <li data-bs-target="#seriesCarousel" data-bs-slide-to="${index}" class="${indicadorAtivo}"></li>
        `;
        carouselIndicators.innerHTML += indicador;
    });
}

// Chamar a função para carregar as séries populares
obterSeriesPopulares();
