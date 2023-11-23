# API-usuarios-Express

O projeto API-usuarios-Express é uma aplicação web construída com Node.js e Express, que oferece serviços de autenticação e gerenciamento de usuários usando um banco de dados MongoDB. Esta aplicação fornece endpoints para cadastro de usuários, autenticação (login), e consulta de informações do usuário autenticado.

## Instalação

Antes de começar, certifique-se de ter o Node.js e o npm instalados em sua máquina. Em seguida, siga as etapas abaixo:

1. Clone este repositório:

   ```
   git clone https://github.com/Genielson/API-usuarios-Express.git
   ```

2. Entre no diretório do projeto:

    ```
    cd pasta-do-projeto 
   ```

3. Instale as dependências:

     ```
     npm install
     ```

## Configuração 

1. Abra o arquivo secrets.js e substitua a string "SUA API KEY" pela key do MONGODB
   Exemplo : mongodb+srv://usuario-teste:minha-senha-teste@cluster0.1myuxcb.mongodb.net/banco-teste?retryWrites=true&w=majority

## Execução 

1. Para executar o projeto apenas rode :  npm start
   O servidor estará disponível em http://localhost:3000.

## Endpoints 

1. Cadastro de usuários (SignUp) : 

   - **Método:** `POST`
   - **Endpoint:** `/api/users/signup`
   - **Descrição:** Cria um novo usuário no API.

   - **Parâmetros:** 
        `nome` : string
        `email` : email
        `senha` : string
        `telefones`: opcional



2. Login de usuários (SignIn) : 

   - **Método:** `POST`
   - **Endpoint:** `/api/users/signin`
   - **Descrição:** Loga com um usuário na API.

   - **Parâmetros:** 
        `email` : email
        `senha` : string


3.  Busca de usuários (Find) : 

   - **Método:** `POST`
   - **Endpoint:** `/api/users/find`
   - **Descrição:** Busca por um usuário na API. Lembrando que para buscar um usuário terá que ter um Token ( Este é gerado quando loga ) 

   - **Parâmetros:** 
        `email` : email


## Tecnologias 

- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript server-side.
- [Express](https://expressjs.com/) - Framework web para Node.js.
- [MongoDB](https://www.mongodb.com/) - Banco de dados NoSQL orientado a documentos.
- [Mongoose](https://mongoosejs.com/) - Biblioteca ODM (Object-Document Mapping) para MongoDB e Node.js.
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Biblioteca para hash de senhas.
- [Outras Dependências](./package.json) - Consulte o arquivo `package.json` para obter uma lista completa de dependências do projeto.
       





   
   
