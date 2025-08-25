# events-app

[![Deploy](https://img.shields.io/badge/production-online-brightgreen)](https://www.oficialfloov.com.br/)

**events-app** é uma aplicação web desenvolvida com [Laravel](https://laravel.com/) (backend) e [React](https://react.dev/) (frontend), permitindo que usuários cadastrem espaços para eventos e outros usuários possam visualizar esses espaços em formato de catálogo.

## Funcionalidades

- Cadastro de espaços para eventos
- Catálogo público de espaços cadastrados
- Autenticação de usuários
- Integração com Stripe para pagamentos (checkout)
- Painel administrativo para gerenciamento dos espaços

## Demonstração

Acesse a aplicação em produção:  
👉 [https://www.oficialfloov.com.br/](https://www.oficialfloov.com.br/)

## Tecnologias Utilizadas

- **Backend:** Laravel 12+
- **Frontend:** React + Inertia.js
- **Banco de Dados:** MySQL
- **Autenticação:** Laravel Sanctum
- **Pagamentos:** Stripe
- **Docker:** Ambiente de desenvolvimento e produção

## Como rodar localmente

### Pré-requisitos

- Docker e Docker Compose instalados
- Node.js 20+ e npm (opcional para rodar fora do Docker)

### Passos

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/events-app.git
    cd events-app
    ```

2. Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente conforme necessário.

3. Suba os containers de desenvolvimento:
    ```sh
    docker compose up -d
    ```

4. Acesse a aplicação em [http://localhost:8000](http://localhost:8000).

5. O frontend React com hot reload estará disponível em [http://localhost:5173](http://localhost:5173) (Vite).

### Comandos úteis

- Rodar migrations:
    ```sh
    docker compose exec app php artisan migrate
    ```
- Instalar dependências:
    ```sh
    docker compose exec app composer install
    docker compose exec node npm install
    ```

## Deploy em produção

1. Configure o domínio e as variáveis de ambiente no `.env`.
2. Gere os certificados SSL (Let’s Encrypt).
3. Suba os containers em modo produção:
    ```sh
    ./up-prod-app.sh
    ```

## Estrutura do Projeto

- `app/` - Código backend Laravel
- `resources/js/` - Código frontend React
- `routes/` - Rotas Laravel
- `public/` - Arquivos públicos
- `docker-compose.yaml` / `.docker/` - Configuração Docker

## Licença

MIT

---

Desenvolvido por [Matheus Henrique Ptasinski Rosa]
