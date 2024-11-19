const apiUrl2 = 'https://api.themoviedb.org/3/tv/on_the_air?api_key=59eac9a58139309f3425af18ab34638c&language=pt-BR&page=1'; // Atualize com sua chave da API
const token2 = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OWVhYzlhNTgxMzkzMDlmMzQyNWFmMThhYjM0NjM4YyIsIm5iZiI6MTczMTk1MzU1Ny42Nzg5NjcsInN1YiI6IjY3M2I4MmEyNzNhNDVlNTE4NGJmYjc5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yGE05VSXU-NIZTLc9n8iFq1hhecU2VUYKoLDfFzBf2M';  // Substitua pelo seu token

const container = document.getElementById('serie-cards');

async function obterSeriesRecentes() {
    try {
        const response = await fetch(apiUrl2, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token2}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }

        const data = await response.json();
        console.log('Resposta da API:', data); // Verifique os dados retornados da API
        const series = data.results.slice(0, 3);  // Pegando apenas as 3 primeiras séries

        if (series && series.length > 0) {
            exibirCards(series);
        } else {
            console.log('Nenhuma série encontrada.');
            container.innerHTML = '<p>Nenhuma série encontrada.</p>';
        }
    } catch (error) {
        console.error("Erro ao obter dados:", error);
        container.innerHTML = '<p>Houve um problema ao carregar as séries. Tente novamente mais tarde.</p>';
    }
}

function exibirCards(series) {
    if (!series || series.length === 0) {
        container.innerHTML = '<p>Nenhuma série disponível no momento.</p>';
        return;
    }

    series.forEach(serie => {
        const imgUrl = serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : '../assets/img/img-series/imagem_default.jpg';

        const card = document.createElement('div');
        card.classList.add('col-md-4');
        card.innerHTML = `
            <div class="card">
                <img src="${imgUrl}" class="card-img-top" alt="${serie.name}">
                <div class="card-body">
                    <h5 class="card-title">${serie.name}</h5>
                    <p class="card-text">${serie.overview || 'Sem descrição disponível.'}</p>
                    <a href="detalhes-serie.html?id=${serie.id}" class="btn btn-primary">Saiba Mais</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (container) {
        obterSeriesRecentes();
    } else {
        console.error('Elemento #serie-cards não encontrado no DOM.');
    }
});
