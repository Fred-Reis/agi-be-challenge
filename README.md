<div align="center">
  <img alt="Agidesk Challenge"
    src="agidesk-logo.svg"
  />

</div>

<h2 align="center">
   Agidesk SignUp Flow
</h2>

<p align="center">

  <img alt="language version" src="https://img.shields.io/badge/Node-v_v20.14.0-339933?logo=node.js">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Fred-Reis/agi-be-challenge">

  
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Fred-Reis/agi-be-challenge">

  <img alt="GitHub repo size in bytes" src="https://img.shields.io/github/repo-size/Fred-Reis/agi-be-challenge">

</p>

<hr/>

<h3 align="center">Links:</h3>

<p align="center">

  <a href="#-sobre-esse-projeto">
    Sobre o projeto
  </a>&nbsp;&nbsp;
  <a href="#-arquitetura">
    Arquitetura
  </a>&nbsp;&nbsp;
  <a href="#-banco-de-dados">
    Banco de dados
  </a>&nbsp;&nbsp;
  <a href="#-executando-o-projeto">
    Executando Projeto
  </a>&nbsp;&nbsp;
  <a href="#-configurando-o-seu-banco-de-dados-localmente">
    Configurando o seu banco de dados localmente
  </a>&nbsp;&nbsp;
  <a href="#-testes">
    Testes
  </a>&nbsp;&nbsp;
  <a href="#-tecnologias-e-ferramentas">
    Tecnologias Ferramentas
  </a>&nbsp;&nbsp;
  <a href="#-roadmap">
    Roadmap
  </a>&nbsp;&nbsp;
  <a href="#author-frederico-reis">
    Author
  </a>

</p>

# 💡 Sobre esse projeto

A proposta desse projeto era construir uma aplicação fullstack que permitisse criar um usuário e enviar um email de confirmação para autenticação:

Caso queira acessar o repositório com o projeto frontend acesse o link a seguir:  
 [🖥 Repositório Frontend](https://github.com/Fred-Reis/agi-fe-challenge/?tab=readme)

<br/>


# 📐 Arquitetura

O projeto foi concebido utilizando a metodologia de DDD - Domain Driven Design, seguindo os princípios do SOLID e Design Patterns.
Separando responsabilidades, diminuindo acoplamentos, facilitando na refatoração e estimulando o reaproveitamento do código.

## 💾 Banco de dados

Para esse projeto foi utilizado o banco de dados PostgreSQL

No banco foram criadas 3 tabelas:

### `User`

Essa tabela registra os usuários e se relaciona com a tabela de [Company](#company)

**Properties**
  - `id`: 
  - `full_name`: 
  - `email`: 
  - `password_hash`: 
  - `phone_number`: 
  - `role`: 
  - `from_where`: 
  - `checked_at`: 
  - `validation_id`: 
  - `company_id`: 

```
"users" {
  String id PK
  String full_name
  String email UK
  String password_hash
  String phone_number
  String role
  String from_where
  DateTime checked_at "nullable"
  String validation_id UK "nullable"
  String company_id FK
}
```

### `Company`

Essa tabela registra as empresas e se relaciona com a tabela de [User](#user)

**Properties**
  - `id`: 
  - `company_name`: 
  - `company_field`: 
  - `company_size`: 
  - `department`: 
  - `url`: 
  - `color`: 
  - `created_at`: 

```
"companies" {
  String id PK
  String company_name
  String company_field
  String company_size
  String[] department
  String url
  String color "nullable"
  DateTime created_at
}
```

### `Public Providers`

Essa tabela registra as os provedores de e-mail públicos, e que não são permitidos para se registrar na aplicação

**Properties**
  - `id`: 
  - `name`: 

```
"public_providers" {
  String id PK
  String name
}
```

### 🔀 Rotas


### /users

`http://{HOST}/users`

Essa é uma rota do tipo `POST` onde recebe todos os dados do usuário no seu body e é feito o cadastro do mesmo e da empresa, caso ela não exista.

`body`
```JSON
{
    "email": "johndoe@example.com",
    "fullName": "John Doe",
    "password": "123456",
    "phoneNumber": "+55999999999",
    "role": "Proprietário",
    "fromWhere": "Linkedin",
    "companyName": "John's Company",
    "companyField": "TI",
    "companySize": "mais de 500",
    "department": ["TI", "Comercial"],
    "url": "https://johnscompany.agidesk.com",
    "color": "#715fc1"
}
```

> O no Back End tem uma validação se a empresa existe ou não, e caso ela não exista uma nova é criada, caso já exista ela é associada ao usuário

**🚨 Até o momento a única identificação da empresa está sendo feito pelo nome da mesma, futuramente essa validação / cadastro deveria ser feito pelo CNPJ, evitando assim problemas de identificação e validação 🚨** 

Após o registo do usuário um e-mail com um token de validação é enviado para o email cadastrado.

### /validate  

`http://{HOST}/validate`

Essa é uma rota do tipo `POST` onde recebe o token de validação do usuário no seu body.

O usuário só poderá se autenticar após essa validação.

`body`

```JSON
{
    "token": "79119c6a-98fa-47f6-9111-6cc757a2edf8"
}
```

### /sessions  

`http://{HOST}/sessions`

Essa é uma rota do tipo `POST` para login e autenticação do usuário, onde recebe o e-mail e password no seu body e retorna um token do tipo `JWT` que será usado para autenticação do usuário para acessar as rotas autenticadas.

`body`

```JSON
{
  "email": "johndoe@example.com",
  "password": "123456"
}
```

`response`

```JSON
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZDExOTY5Ni00MWQ3LTRkNTgtYTJjZi0wZGY0ODRmY2QxNDgiLCJpYXQiOjE3MjE2NzA4MzZ9.qiv1dOkVE-mKNSg6-qn8dFvVOLqOxwWWo8ORmarNG4I"
}
```


### /profile

`http://{HOST}/profile`

Essa é uma rota privada do tipo `GET` onde o o token enviado na rota `/sessions` deve ser inserido no header da requisição.
Essa rota retorna o perfil do usuário autenticado e os dados da empresa associada a ele


`response`

```JSON
{
  "user": {
    "id": "0d119696-41d7-4d58-a2cf-0df484fcd148",
    "full_name": "John Doe",
    "email": "johndoe@example.com",
    "password_hash": "$2a$06$cEBFtq1n6qy87X4swMFGNunAsyII1SkiVEKGcdqq.xjuybKY7yDsS",
    "phone_number": "+55999999999",
    "role": "Proprietário",
    "from_where": "Linkedin",
    "checked_at": "2024-07-22T17:53:23.190Z",
    "validation_id": null,
    "company_id": "33eb95b7-5fb1-4391-abd6-bc21baa0443d"
  },
  "company": {
    "id": "33eb95b7-5fb1-4391-abd6-bc21baa0443d",
    "company_name": "John's Company",
    "company_field": "TI",
    "company_size": "mais de 500",
    "department": [
      "TI", 
      "Comercial"
    ],
    "url": "https://johnscompany.agidesk.com",
    "color":"#715fc1",
    "created_at": "2024-07-22T17:50:44.489Z"
  }
}
```


### /providers 
`http://{HOST}/providers`

Essa é uma rota pública do tipo `GET` que retorna uma lista com os provedores que não são permitidos para cadastro do usuário na plataforma.

`response`

```JSON
{
  "providers": [
    {
      "id": "4dee9c3f-c19d-456f-9776-0b3270b0a8b1",
      "name": "gmail"
    },
    {
      "id": "d892d751-2060-4098-866e-20221948e5ba",
      "name": "yahoo"
    },
    {
      "id": "cc3b482b-8803-4b18-b4b2-5f265e39e1fb",
      "name": "outlook"
    },
    {
      "id": "22380b76-d70f-44c9-8f26-945615d9962b",
      "name": "outmail"
    },
    {
      "id": "12525a0e-f7e6-4b2d-a221-30a3f3212574",
      "name": "hotmail"
    },
    {"..."}
  ]
}
```

<br/>

# 🏁 Executando o projeto

1 - Para rodar pela primeira vez o projeto será necessário a criação de uma pasta.

```bash
$ mkdir <nome-da-pasta>
```

2 - Agora entre na pasta criada.

```bash
$ cd <nome-da-pasta>
```

3 - Vamos clonar o repositório

```bash
$ git clone https://github.com/Fred-Reis/agi-be-challenge
```

4 - Execute o comando a seguir para a criação da pasta `node_modules`

```bash
$ npm install
```

5 - Para iniciar o servidor em modo desenvolvimento execute o seguinte comando

```bash
$ npm run start:dev
```

<br/>


## 🐘 Configurando o seu banco de dados localmente

Como dito anteriormente essa aplicação utiliza o banco de dados relacional PostgreSQL.
E para rodar localmente vamos utilizar o Docker como container

### 🐳 Configurando o Docker

O projeto possui um arquivo chamado `docker-compose.yml` que possui as configurações para o deploy do projeto em um container do [Docker](https://www.docker.com/), ele é quem irá passar todos parâmetros que o Docker utilizará para baixar nossa imagem e configurar o nosso banco de dados.

Vamos partir da premissa que você já tem o docker instalado e pronto para baixar a imagem e rodar o banco de dados, caso ainda não tenha recomendo seguir esse [GUIA](https://www.notion.so/Instalando-o-Docker-373b5fed9526414c8bf018275248cf10).

### 📦 Baixando Imagem e Subindo o Banco de Dados em um container

Com o Docker devidamente instalado basta executar o comoando a seguir na raiz do projeto backend

```bash
$ docker compose up -d
```

A partir de agora o seu banco de dados já vai estar rodando em um container Docker

Se tudo deu certo até aqui execute o comando a seguir e você verá o seu container rodando.

```bash
$ docker ps -a
```

Caso ele não esteja rodando você pode dar o start no seu container com o comando:

```bash
$ docker start <id do container>
```

E com o comando abaixo você deverá ver o seu container executando

```bash
$ docker ps
```

Caso isso não aconteça execute o comando abaixo e veja o que aconteceu de errado com a execução do seu container

```bash
$ docker logs <id do container>
```

Agora para estabelecer a conexão por favor crie um arquivo `.env`  na raiz do seu projeto backend, seguindo o modelo a seguir:
> Na raiz do projeto já existe um arquivo modelo chamado .env.example

```.env
NODE_ENV=dev
PORT='3333'
DATABASE_URL='postgresql://docker:docker@localhost:5432/agidesk?schema=public'
NODEMAILER_PASS="token do seu email"
NODEMAILER_USER="voce precisa adicionar uma conta @gmail.com"
FRONTEND_URL="http://localhost:3000"
JWT_SECRET="agidesk"
```

> As variáveis `NODEMAILER_PASS` e `NODEMAILER_USER` são necessárias para o envio de email de validação do usuário. Elas correspondem ao endereço de que irá enviar oemail e o token de autenticação do mesmo, respectivamente. É importante lembrar que esse email precisar ser do provedor `Gmail`, podendo ser uma conta do tipo pública gratuita.

## Criando migrations e populando o Banco de Dados

Para a conectar o projeto com o banco de dados foi utilizado o ORM [Prisma](https://prisma.io/).

**🚨 Apenas lembrando que para executar as migrations e seeds o seu banco de dados deve estar rodando!! 📣**

Para executar as `migrations` que irão criar as tabelas no banco de dados, na raiz do projeto execute o comando a seguir:

```bash
$ npx prisma migrate dev
```

Após esse comando, as tabelas devem estar criadoas no seu banco

Agora vamos popular a tabela de providers com alguns valores de servidores públicos mais comuns.
Para executar as `seeds` que irá popular a tabela de providers no banco de dados, na raiz do projeto execute o comando a seguir:

```bash
$ npx prisma db seed
```

Caso queira visualizar o seu banco de dados, o Prisma fornece uma plataforma que roda no browser para visualização.

No terminal rode o seguinte comando

```bash
$ npx prisma studio
```
Uma nova guia irá abrir e você poderá visualizar o seu banco de dados.

<br/>

# 🧪 Testes

Foram implementados (Parcialmente) testes unitários e de integração (E2E) utilizando [vitest](https://vitest.dev/);

Para executar os testes unitários basta executar os seguintes comandos na raiz do projeto:

```bash
$ npm run test
```

Os detalhes do teste serão apresentados no seu console.

Caso queira ver a cobertura dos testes executados rode o comando abaixo.

Será gerado automáticamente na raiz do seu projeto uma pasta chamada `coverage`. Dentro dessa pasta terá um arquivo `index.html` abra ele no seu browser e tenha acesso a mais detalhes dos testes executados.

```bash
$ npm run test:coverage
```

Para executar os testes de integração (E2E) rode o comando abaixo.

```bash
$ npm run test:e2e
```

Os detalhes do teste serão apresentados no seu console.

<br/> 

> Foi criado também uma pipeline de CI/CD no Github, onde toda vez que um push é feito os testes são executados, mais detalhes dessas actions estão na pasta `.github/workflows`

**🚨 Apenas lembrando que para executar os testes o projeto deve estar rodando!! 📣**

<br/>

# 🛠 Tecnologias e Ferramentas

Algumas das tecnologias e ferramentas utilizadas no backend.

- [**NodeJS**](https://nodejs.org/en/);
- [PostgreSql](https://postgresql.org/);
- [Docker;](https://www.docker.com/);
- [Fastify](https://fastify.io/);
- [Vitest](https://vitest.dev/);
- [Prisma](https://prisma.io/);
- [JWT](https://jwt.io/);
- EsLint;

<br/>

# 📍🗺️ Roadmap

Algumas das funcionalidades que devem ser implementadas em breve

- [ ] Criação de mais testes para cobrir todo o projeto
- [ ] Criar uma rota do tipo `POST` para inserir providers externamente
- [ ] Mudar a forma de autenticação da empresa do nome para o CNPJ, evitando assim que uma mesma empresa seja cadastrada com nomes diferentes por erro de digitação, ou que um usuário seja associado a uma empresa incorreta.
- [ ] Implementação de uma ferramenta de coleta de dados, tipo [Datadog](https://www.datadoghq.com/) ou [Sentry](https://sentry.io/).
- [ ] Integração com uma ferramenta de criação de documentação como [Swagger](https://swagger.io/).

<hr/>
<br/>

<p align="center">
  Se você chegou até aqui é sinal que tudo deu certo e você já pode fazer a suas requisições 😱
</p>

<br/>

<h4 align="center">
😃 Agora rode o projeto e ... SEJA FELIZ!
</h4>

<h4 align="center">
  "Stay hungry stay foolish!"
</h4>

<br/>

---

<h3 align="center">
Author: <a alt="Fred-Reis" href="https://github.com/Fred-Reis">Frederico Reis</a>
</h3>

<p align="center">

  <a alt="Frederico Reis" href="https://www.linkedin.com/in/frederico-reis-dev/">
    <img src="https://img.shields.io/badge/LinkedIn-Frederico_Reis-0077B5?logo=linkedin"/></a>
  <a alt="Frederico Reis" href="https://github.com/Fred-Reis ">
  <img src="https://img.shields.io/badge/Fred_Reis-GitHub-000?logo=github"/></a>

</p>

<p align="center">
  Feito com ♥️
</p>


