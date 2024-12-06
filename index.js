// Importando as bibliotecas necessárias
const express = require('express'); // Express é usado para criar o servidor HTTP
const path = require('path'); // Módulo para manipulação de caminhos de arquivos
const fs = require('fs'); // Módulo para ler e escrever em arquivos
const app = express(); // Inicializa uma instância do Express
const port = 3000; // Definição da porta onde o servidor vai rodar
const axios = require('axios'); // Axios é utilizado para fazer requisições HTTP externas

// Definindo a chave da API que será usada para se comunicar com a API do TMDb
const API_KEY = '59eac9a58139309f3425af18ab34638c'; // Substitua pela sua chave de API do TMDb

// Configuração para servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public'))); // Servindo arquivos estáticos da pasta 'public'
app.use(express.json()); // Middleware para interpretar requisições com corpo JSON (POST e DELETE)

// Definição do caminho para o arquivo db.json que vai armazenar as séries favoritas
const dbPath = path.join(__dirname, 'db.json');

// Função para ler as séries favoritas do arquivo db.json
const lerSeriesFavoritas = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8'); // Lê o arquivo de forma síncrona
    return JSON.parse(data).series_favoritas || []; // Retorna as séries ou um array vazio caso não existam
  } catch (error) {
    console.error('Erro ao ler o arquivo db.json:', error); // Exibe erro caso haja falha na leitura do arquivo
    return []; // Retorna um array vazio em caso de erro
  }
};

// Função para salvar as séries favoritas no arquivo db.json
const salvarSeriesFavoritas = (seriesFavoritas) => {
  try {
    const data = JSON.stringify({ series_favoritas: seriesFavoritas }, null, 2); // Converte o array de séries para formato JSON bonito
    fs.writeFileSync(dbPath, data); // Salva as séries no arquivo de forma síncrona
  } catch (error) {
    console.error('Erro ao salvar no arquivo db.json:', error); // Exibe erro caso haja falha ao salvar os dados
  }
};

// Rota GET para listar todas as séries favoritas
app.get('/series_favoritas', (req, res) => {
  const seriesFavoritas = lerSeriesFavoritas(); // Lê as séries favoritas do arquivo
  res.json(seriesFavoritas); // Retorna as séries favoritas como resposta no formato JSON
});

// Rota POST para adicionar uma série aos favoritos
app.post('/series_favoritas', (req, res) => {
  const serie = req.body;  // A série que está sendo adicionada
  // Verificar se a série já está nos favoritos
  if (favoritos.some(fav => fav.id === serie.id)) {
    return res.status(400).json({ message: 'Série já está nos favoritos.' });
  }
  favoritos.push(serie);  // Adiciona a série
  res.status(200).json({ message: 'Série adicionada aos favoritos!' });
});

app.delete('/series_favoritas/:id', (req, res) => {
  const { id } = req.params;
  const index = favoritos.findIndex(fav => fav.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Série não encontrada nos favoritos.' });
  }
  favoritos.splice(index, 1);  // Remove a série
  res.status(200).json({ message: 'Série removida dos favoritos!' });
});




// Rota para servir arquivos estáticos da pasta 'assets' (CSS, imagens, etc.)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Rota para servir o arquivo HTML principal (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Retorna o arquivo HTML para a página inicial
});

// Inicia o servidor na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`); // Exibe no console que o servidor está rodando
});
