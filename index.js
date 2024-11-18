const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


const API_KEY = '59eac9a58139309f3425af18ab34638c'; // Substitua pela sua chave de API do TMDb

// Definir diretório público
app.use(express.static(path.join(__dirname, 'public')));

// Função para obter séries populares
const getPopularSeries = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=pt-BR`);
    return response.data.results;
  } catch (error) {
    console.error("Erro ao obter séries populares:", error);
    return [];
  }
};

// Serve arquivos estáticos da pasta 'assets' (css, img, etc.)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Rota para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
