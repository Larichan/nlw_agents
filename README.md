# NLW Agents

Este projeto, **NLW Agents**, foi desenvolvido durante um evento da [Rocketseat](https://rocketseat.com.br/).

## Descrição

O NLW Agents é uma aplicação fullstack composta por um backend em Node.js/TypeScript utilizando Fastify e Drizzle ORM, e um frontend em React com Vite e TailwindCSS.

## 🚀 Tecnologias Utilizadas

### Backend (`server/`)
- **Node.js** & **TypeScript**
- **Fastify**: Framework web para Node.js, rápido e eficiente.
- **Zod**: Validação de esquemas e tipos.
- **Drizzle ORM**: ORM moderno para TypeScript.
- **PostgreSQL**: Banco de dados relacional.
- **Docker**: Containerização do banco de dados
- **drizzle-seed**: Geração de dados fake para desenvolvimento.
- **@fastify/cors**: Middleware para CORS.

### Frontend (`web/`)
- **React**: Biblioteca para construção de interfaces de usuário.
- **Vite**: Bundler moderno e rápido para desenvolvimento frontend.
- **TailwindCSS**: Framework utilitário para estilização.
- **@tanstack/react-query**: Gerenciamento de dados assíncronos.
- **React Router DOM**: Roteamento SPA.
- **class-variance-authority**, **clsx**, **tailwind-merge**: Utilitários para composição de classes CSS.
- **Radix UI**: Componentes acessíveis e sem estilos para React.
- **Shadcn/ui**: Sistema de componentes
- **Lucide React**: Biblioteca de ícones

## 💼 Padrões de Projeto Utilizados

- **Repository Pattern**: Separação da lógica de acesso a dados em repositórios.
- **Service Layer**: Camada de serviços para regras de negócio.
- **DTO (Data Transfer Object)**: Estruturas para transferência de dados entre camadas.
- **Validação com Zod**: Garantia de tipos e validação de dados de entrada.
- **Componentização**: Reutilização de componentes React no frontend.

## ⚙ Setup e Configuração

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão recomendada: 18+)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (pode ser via Docker)

### Passos para rodar o projeto

1. **Clone o repositório:**
   ```sh
    git clone <url-do-repositorio>
    cd nlwagents
   ```
2. **Configuração de Backend:**
- Acesse a pasta `server/`:
    ```sh
    cd server
    ```
- Instale as dependências:
    ```
    npm install
    ```
- Configure o arquivo `.env` com as variáveis do banco de dados PostgreSQL (exemplo disponível em `.env.example`).
- Execute as migrations do Drizzle ORM:
    ```
    npm run migrate
    ```
- (Opcional) Popule o banco com dados fictícios através de um seed:
    ```
    npm run seed
    ```
- Inicie o servidor:
    ```
    npm run dev
    ```

3. **Configuração do Frontend:**
- Acesse a pasta `web`:
    ```sh
    cd ../web
    ```
- Instale as dependências:
    ```
    npm install
    ```
- Inicie o frontend:
    ```
    npm run dev
    ```

4. **Acesse a aplicação:**
- O backend estará disponível em `http://localhost:8080`
- O frontend estará disponível em `http://localhost:5173`

---
Desenvolvido durante o evento NLW da Rocketseat 🚀