const apiKey = '59eac9a58139309f3425af18ab34638c';
const apiUrl = 'https://api.themoviedb.org/3';
const movieId = new URLSearchParams(window.location.search).get('id'); // Obtém o ID da série da URL
const serverUrl = 'http://localhost:3001/series_favoritas'; // URL do seu servidor de favoritos

// Função para buscar os detalhes da série
async function obterDetalhesSerie(id) {
    try {
        console.log('Iniciando a requisição para detalhes da série com o ID:', id); // Log de depuração
        const response = await fetch(`${apiUrl}/tv/${id}?api_key=${apiKey}&language=pt-BR`);
        console.log('Resposta da API:', response); // Log de depuração

        if (!response.ok) throw new Error('Erro ao buscar detalhes da série');

        const serie = await response.json();
        console.log('Detalhes da série:', serie); // Log de depuração
        atualizarDetalhesSerie(serie);
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para atualizar os detalhes da série no HTML
function atualizarDetalhesSerie(serie) {
    document.getElementById('seriePoster').src = serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : 'caminho/default.jpg';
    document.getElementById('seriePoster').alt = serie.name || 'Nome não disponível';
    document.getElementById('serieTitulo').textContent = serie.name || 'Título não disponível';
    document.getElementById('serieDescricao').textContent = serie.overview || 'Descrição não disponível';
    document.getElementById('serieGenero').textContent = serie.genres ? serie.genres.map(g => g.name).join(', ') : 'Gênero não disponível';
    document.getElementById('serieDuracao').textContent = serie.runtime ? `${serie.runtime} minutos` : 'Duração não disponível';
    document.getElementById('serieClassificacao').textContent = serie.vote_average || 'Classificação não disponível';
    document.getElementById('serieLancamento').textContent = serie.first_air_date || 'Data de lançamento não disponível';
    document.getElementById('seriePlataforma').textContent = 'Não especificado'; // Substitua se houver informações de plataforma

    // Verificar se a série já está nos favoritos e atualizar o botão
    verificarSeFavorito(serie);
}

// Função para verificar se a série está nos favoritos
async function verificarSeFavorito(serie) {
    try {
        const response = await fetch(serverUrl);
        const favoritos = await response.json();

        // Procurar a série nos favoritos
        const serieExistente = favoritos.find(fav => fav.id === serie.id);
        const botaoFavorito = document.querySelector('button');

        if (serieExistente) {
            botaoFavorito.textContent = 'Remover dos Favoritos';
            // Adiciona o evento para remover a série
            botaoFavorito.removeEventListener('click', () => adicionarAosFavoritos(serie));
            botaoFavorito.addEventListener('click', () => removerDosFavoritos(serie));
        } else {
            botaoFavorito.textContent = 'Adicionar aos Favoritos';
            // Adiciona o evento para adicionar a série aos favoritos
            botaoFavorito.removeEventListener('click', () => removerDosFavoritos(serie));
            botaoFavorito.addEventListener('click', () => adicionarAosFavoritos(serie));
        }
    } catch (error) {
        console.error('Erro ao verificar favoritos:', error);
    }
}

// Função para adicionar a série aos favoritos
async function adicionarAosFavoritos(serie) {
    try {
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: serie.id,
                nome: serie.name, // Nome da série
                descricao: serie.overview, // Descrição da série
                imagem: `https://image.tmdb.org/t/p/w500${serie.poster_path}`,
                detalhesUrl: `detalhes-serie.html?id=${serie.id}`
            }),
        });

        if (!response.ok) throw new Error('Erro ao adicionar aos favoritos.');

        alert('Série adicionada aos favoritos!');
        verificarSeFavorito(serie); // Atualiza o botão para remover
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao adicionar aos favoritos.');
    }
}

// Função para remover a série dos favoritos
async function removerDosFavoritos(serie) {
    try {
        const loading = document.getElementById('loading-spinner');
        if (loading) {
            loading.style.display = 'block'; // Só tenta acessar se o elemento existir
        } else {
            console.warn('Elemento de carregamento não encontrado.');
        }

        const response = await fetch(`${serverUrl}/${serie.id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Erro ao remover dos favoritos.');

        alert('Série removida dos favoritos!');
        verificarSeFavorito(serie); // Atualiza o botão para adicionar
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao remover dos favoritos.');
    } finally {
        const loading = document.getElementById('loading-spinner');
        if (loading) loading.style.display = 'none'; // Oculta o spinner
    }
}

// Chamar a função com o ID da série
if (movieId) {
    obterDetalhesSerie(movieId);
} else {
    console.error('ID da série não encontrado na URL');
}
