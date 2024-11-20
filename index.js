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
  const serie = req.body; // Obtém os dados da série enviados no corpo da requisição
  const seriesFavoritas = lerSeriesFavoritas(); // Lê as séries favoritas atuais
  seriesFavoritas.push(serie); // Adiciona a nova série ao array
  salvarSeriesFavoritas(seriesFavoritas); // Salva as séries favoritas atualizadas no arquivo
  res.status(201).json(serie); // Retorna a série adicionada com o status HTTP 201 (Criado)
});

// Rota DELETE para remover uma série dos favoritos
app.delete('/series_favoritas/:id', (req, res) => {
  const serieId = Number(req.params.id); // Obtém o ID da série a partir dos parâmetros da URL, convertendo para número
  console.log("ID recebido para remoção:", serieId); // Log para debug

  const seriesFavoritas = lerSeriesFavoritas(); // Lê as séries favoritas do arquivo
  console.log("Séries favoritas:", seriesFavoritas); // Log para ver as séries favoritas no momento

  const index = seriesFavoritas.findIndex(serie => serie.id === serieId); // Busca o índice da série pelo ID
  console.log("Índice encontrado:", index); // Log para verificar o índice encontrado

  if (index !== -1) { // Se o índice da série for encontrado
    seriesFavoritas.splice(index, 1); // Remove a série do array usando o índice
    salvarSeriesFavoritas(seriesFavoritas); // Salva as séries favoritas atualizadas no arquivo
    res.status(200).json({ message: 'Série removida dos favoritos' }); // Retorna uma mensagem de sucesso
  } else {
    res.status(404).json({ error: 'Série não encontrada' }); // Se o ID não for encontrado, retorna erro 404
  }
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
