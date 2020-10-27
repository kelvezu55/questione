# Questione

# Requisitos
- Apache 2.4.29 
- PHP 7.2
- MySQL 5.0

# Instalação
Para realizar a instalação da aplicação back-end, deve-se seguir os passos abaixo:
copiar todos os arquivos, com exceção da pasta html, da pasta bq_api do repositório para a pasta /var/www 
copiar todos os arquivos da pasta html do repositório para a pasta html do servidor
configurar o arquivo /config/database.php dentro da pasta do projeto com a url do banco de dados

Para realizar a instalação da aplicação front-end, deve-se seguir os passos:
fazer download da pasta  bq_new_front do repositório
entrar pelo terminal na pasta da aplicação e executar o comando: npm run build
configurar a variável baseURL do arquivo /src/services/api.js com a URL da aplicação back-end
após termos os arquivos prontos para deploy, é necessário passar os mesmos para o servidor, na pasta onde você vai querer fazer o deploy.

# Propósito
O Questione é um software que tem como propósito medir e acompanhar o aprendizado do discente. O sistema possui um banco de questões que são classificadas por competências e objetos de conhecimento. As questões são disponibilizadas para que o docente possa montar uma avaliação. O questione permite a análise dos resultados, como média de acertos da turma por avaliação, média de acertos por questão, quantidade de acerto por aluno, variância por questão e por aluno, porcentagem de acerto por competência e objeto de conhecimento e indicação de acertos por alternativas da questão, são disponibilizadas, permitindo assim que o professor compreenda de fato as necessidade e dificuldades do discente em relação ao conteúdo exposto.

# Como usar 
Para se utilizar o Questione é necessário inicialmente a realização de cadastro, o qual deverá ser informado o nome, email e senha.
O Questione disponibiliza as seguintes funcionalidades:
- Questões: selecionar, inserir, editar, duplicar e excluir.
Para cadastrar uma nova questão é necessário informar: texto-base, enunciado e alternativas. Ao final do cadastro faz-se necessário classificá-la em relação a competência e o objeto de conhecimento.
A seleção de questões poderá ser feita por meio de curso, competência, objetos de conhecimento ou palavras-chaves.
- Avaliações: Criar, arquivar ou excluir avaliações.
Você poderá criar e adicionar questões as avaliações; para isso é necessário fornecer uma breve descrição sobre a avaliação e gerar uma aplicação, onde será gerado um código automaticamente que deverá ser utilizado pelos estudantes para responder a avaliação. Uma avaliação poderá ser aplicada mais de uma vez.
- Aplicações: as aplicações podem ser ativadas ou desativadas, como também podem ser configuradas para gerar prova de forma randômica e disponibilizar os gabaritos aos discentes.
- Análise: É possível visualizar os resultados por aluno, por questão, por competência e objeto de conhecimento. Podem ser realizadas as seguintes análises sobres os dados: média de acertos por questão, quantidade de acerto por aluno, variância por questão e por aluno, porcentagem de acerto por competência e objeto de conhecimento e indicação de acertos por alternativas da questão.

Para que o aluno tenha acesso a avaliação é necessário informar um código o qual foi gerado durante a criação da prova.
Na versão do aluno é possível a visualização das avaliações respondidas e os seus respectivos gabaritos.

