# Sistema de Gerenciamento de Pedidos de Pizzaria

Este projeto implementa um sistema de gerenciamento de pedidos de uma pizzaria, utilizando operações de CRUD (Create, Read, Update, Delete) para controlar os pedidos. O sistema é desenvolvido utilizando o framework **Express** para o back-end, **Handlebars** para o front-end e **Sequelize** como ORM para interações com o banco de dados.

## Funcionalidades

- **Criar Pedidos**: Permite adicionar novos pedidos ao sistema.
- **Visualizar Pedidos**: Exibe todos os pedidos realizados, com detalhes como ingredientes, preço e status.
- **Atualizar Pedidos**: Permite editar pedidos existentes, alterando informações como ingredientes ou status de preparo.
- **Deletar Pedidos**: Remove pedidos da base de dados.
- **Gerenciamento de Status**: Controle do status dos pedidos (em preparo, pronto, entregue).

## Tecnologias Utilizadas

- **JavaScript (ES6+)**
- **Node.js**: Ambiente de execução para o back-end.
- **Express**: Framework utilizado para gerenciar as rotas e o servidor.
- **Handlebars**: Motor de templates para renderizar páginas dinâmicas no front-end.
- **Sequelize**: ORM utilizado para interagir com o banco de dados.
- **MySQL/PostgreSQL**: Banco de dados relacional utilizado no projeto.

## Estrutura do Projeto

```bash
pizzaria-crud/
│
├── config/
│   └── database.js        # Configuração do banco de dados com Sequelize
│
├── controllers/
│   └── pedidosController.js # Lógica para manipulação dos pedidos
│
├── models/
│   └── Pedido.js          # Modelo de dados dos pedidos com Sequelize
│
├── public/
│   └── styles.css         # Arquivos estáticos (CSS, JS)
│
├── views/
│   ├── layouts/
│   │   └── main.handlebars # Template principal da aplicação
│   └── pedidos/
│       ├── index.handlebars  # Página para exibir todos os pedidos
│       └── form.handlebars   # Página de formulário para criar/editar pedidos
│
├── routes/
│   └── pedidos.js         # Definição das rotas para o CRUD de pedidos
│
├── app.js                 # Arquivo principal que inicializa o servidor Express
├── package.json           # Dependências do projeto
└── README.md              # Documentação do projeto
```

## Instalação
Clone o repositório:

git clone https://github.com/seu-usuario/pizzaria-crud.git

Navegue até o diretório do projeto e instale as dependências:

cd pizzaria-crud
npm install

Configure o banco de dados no arquivo .env (exemplo):

DB_NAME=pizzaria
DB_USER=root
DB_PASS=sua_senha
DB_HOST=localhost
DB_DIALECT=mysql # ou postgres se estiver usando PostgreSQL
Rode as migrações do banco de dados para criar as tabelas necessárias:

npx sequelize-cli db:migrate

## Inicie o servidor:

npm start
Acesse o sistema no navegador em http://localhost:3000.

## Como Usar
Acesse a interface web para criar, visualizar, editar e deletar pedidos.
Gerencie o status dos pedidos diretamente pela interface.

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request ou relatar problemas no repositório.

## Licença
Este projeto está licenciado sob a MIT License.

Observação: Certifique-se de que o MySQL ou PostgreSQL esteja configurado corretamente e rodando conforme definido no arquivo .env.
