# 🎬 SeriBox - Portal de Séries Dinâmico

![SERI](https://github.com/user-attachments/assets/457cb4e6-96f6-4ebf-8dac-522a623c7466)

## 🎓 Introdução

Bem-vindo ao **SeriBox**! Este projeto foi desenvolvido como parte do desafio da disciplina de **Desenvolvimento de Interfaces Web**. Agora, o objetivo é criar um portal dinâmico de séries que integra a API **The Movie DB (TMDb)** para informações sobre séries e utiliza o **JSONServer** como back-end, oferecendo uma experiência interativa e rica para os amantes de séries.

## 📋 Descrição do Projeto

O **SeriBox** consiste em três telas principais que trazem informações dinâmicas obtidas de APIs e armazenadas localmente:

1. **Tela Principal (index.html)**: Apresenta destaques, séries novas, informações sobre o autor e favoritas.
2. **Tela de Exploração (explorer.html)**: Permite pesquisar séries de forma dinâmica.
3. **Tela de Detalhes da Série (detalhes.html)**: Exibe detalhes específicos de uma série, incluindo elenco e opção de marcar como favorita.

## 🖥️ Estrutura do Site e Funcionalidades

### Tela Principal (index.html)

1. **Cabeçalho**: Contém logo e menu de navegação.
2. **Carrossel de Séries Populares**: Exibe as séries mais populares, com imagens, nomes e descrições, utilizando dados obtidos da API TMDb.
3. **Novidades**: Cards que mostram as séries mais recentes.
4. **Informações do Autor**: Dados pessoais e profissionais do criador do portal, obtidos do JSONServer.
5. **Séries Favoritas**: Lista de séries favoritas marcadas pelo usuário.

---

### Tela de Exploração (explorer.html)

1. **Campo de Pesquisa**: Permite buscar séries por nome, consultando a API TMDb.
2. **Resultados da Pesquisa**: Exibição de cards com as séries retornadas, contendo imagem, nome e detalhes.
3. **Navegação para Detalhes**: Clique em uma série redireciona para a tela de detalhes.

---

### Tela de Detalhes (detalhes.html)

1. **Informações Gerais**: Apresenta dados como título, sinopse, data de lançamento e outras informações relevantes da série.
2. **Elenco**: Lista de atores principais com fotos e nomes, obtidos da API TMDb.
3. **Marcar como Favorita**: Opção de salvar a série no JSONServer como favorita.

---

### Estrutura de Dados - JSONServer

O projeto utiliza duas principais estruturas no arquivo `db.json` do JSONServer:

1. **Perfil do Usuário**:
   ```json
   {
       "id": 1,
       "nome": "Samuel Mascarenhas",
       "curso": "Ciências da Computação",
       "email": "exemplo@email.com",
       "redes": {
           "facebook": "link_facebook",
           "twitter": "link_twitter",
           "instagram": "link_instagram"
       },
       "bio": "Apaixonado por tecnologia e séries.",
       "avatar": "url_imagem"
   }
2. **Séries Favoritas**:
```json

    {
        "id": "1",
        "nome": "Breaking Bad",
        "descricao":"",
        "imagem":"",
        "detalhesUrl":""
    }
```
---

## 🚀 Como Rodar o Projeto Localmente
### Requisitos
- Node.js
- JSONServer
- Chave da API TMDb

## Passos
### Clone o repositório:

```bash

git clone https://github.com/seu_usuario/SeriBox.git
cd SeriBox
```
### Instale e inicie o JSONServer:

```bash
npm install -g json-server
json-server --watch db.json
```
### Configure sua chave da API TMDb:

- Substitua API_KEY no arquivo script.js pela sua chave da TMDb.
- Abra o arquivo index.html no navegador para visualizar o portal.

 ## 🛠️ Tecnologias Utilizadas
- HTML5
- CSS3
- JavaScript
- Bootstrap (componentes responsivos)
- JSONServer (back-end)
- API TMDb (integração dinâmica)

## 📝 Considerações Finais
O SeriBox foi projetado para oferecer uma experiência intuitiva e envolvente. Com o uso de tecnologias modernas, ele demonstra a importância da integração de APIs e da construção de aplicações dinâmicas.

## 📬 Contato
Dúvidas ou sugestões? Entre em contato:
🔗 https://www.linkedin.com/in/samuellmascarenhas/

🎉 Aproveite sua jornada no SeriBox! 🌟
