const apiKey = '59eac9a58139309f3425af18ab34638c';
const apiUrl = 'https://api.themoviedb.org/3';
const movieId = new URLSearchParams(window.location.search).get('id'); // Obtém o ID da série da URL

// Função para buscar os detalhes da série
async function obterDetalhesSerie(id) {
    try {
        const response = await fetch(`${apiUrl}/tv/${id}?api_key=${apiKey}&language=pt-BR`);
        if (!response.ok) throw new Error('Erro ao buscar detalhes da série');

        const serie = await response.json();
        atualizarDetalhesSerie(serie);
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para atualizar os detalhes da série no HTML
function atualizarDetalhesSerie(serie) {
    document.getElementById('seriePoster').src = `https://image.tmdb.org/t/p/w500${serie.poster_path}`;
    document.getElementById('seriePoster').alt = serie.title;
    document.getElementById('serieTitulo').textContent = serie.title;
    document.getElementById('serieDescricao').textContent = serie.overview;
    document.getElementById('serieGenero').textContent = serie.genres.map(g => g.name).join(', ');
    document.getElementById('serieDuracao').textContent = `${serie.runtime} minutos`;
    document.getElementById('serieClassificacao').textContent = serie.vote_average;
    document.getElementById('serieLancamento').textContent = serie.release_date;
    document.getElementById('seriePlataforma').textContent = 'Não especificado'; // Substitua se houver informações de plataforma
}

// Chamar a função com o ID da série
if (movieId) {
    obterDetalhesSerie(movieId);
} else {
    console.error('ID da série não encontrado na URL');
}
