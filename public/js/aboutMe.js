// URL do JSONServer que será utilizada para obter os dados do aluno
const apiUrl3 = 'http://localhost:3001/student'; // Definindo a URL da API

// Função assíncrona para carregar os dados do aluno a partir da API
async function carregarDadosDoAluno() {
    try {
        // Realiza a requisição GET à API utilizando fetch
        const response = await fetch(apiUrl3);

        // Verifica se a resposta da requisição foi bem-sucedida (código 200)
        if (!response.ok) {
            // Caso não seja bem-sucedida, lança um erro
            throw new Error('Erro ao obter os dados do aluno.');
        }

        // Converte a resposta da API para formato JSON
        const data = await response.json();

        // Atualiza os elementos HTML com os dados obtidos da API
        // A propriedade 'about' do aluno é inserida no elemento com id 'about'
        document.getElementById('about').textContent = data.about;
        
        // A imagem de perfil do aluno é inserida no elemento com id 'profileImage'
        document.getElementById('profileImage').src = data.profileImage;
        
        // O nome do aluno é inserido no elemento com id 'studentName'
        document.getElementById('studentName').textContent = data.name;
        
        // O curso do aluno é inserido no elemento com id 'course'
        document.getElementById('course').textContent = data.course;
        
        // A classe do aluno é inserida no elemento com id 'class'
        document.getElementById('class').textContent = data.class;

        // Atualiza os links de redes sociais com os dados fornecidos pela API
        document.getElementById('linkedin').href = data.socialLinks.linkedin; // Link para o LinkedIn
        document.getElementById('github').href = data.socialLinks.github; // Link para o GitHub
        document.getElementById('portfolio').href = data.socialLinks.portfolio; // Link para o Portfólio

    } catch (error) {
        // Caso haja um erro (como falha na requisição), exibe uma mensagem de erro no console
        console.error('Erro:', error);

        // Caso ocorra erro, atualiza a área '.student-info' com uma mensagem de falha
        document.querySelector('.student-info').innerHTML = '<p>Erro ao carregar informações do aluno.</p>';
    }
}

// Chama a função carregarDadosDoAluno assim que o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', carregarDadosDoAluno);
