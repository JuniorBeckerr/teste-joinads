# Teste JoinAds

## Clonando o Repositório

Para começar, clone o repositório do projeto usando o Git. Execute o seguinte comando no terminal:

git clone https://github.com/JuniorBeckerr/teste-joinads


## Rodando o Backend

### 1. Acesse o diretório do backend

Navegue até o diretório do backend:

cd backend


### 2. Instale as dependências

Instale as dependências do projeto usando o Composer:

composer install


### 3. Configure o ambiente

Copie o arquivo de exemplo `.env` para criar seu próprio arquivo de configuração de ambiente:

cp .env.example .env


### 4. Gere a chave da aplicação

Gere uma chave única para a aplicação Laravel:

php artisan key


### 5. Configure o banco de dados

**Antes de rodar as migrações, certifique-se de que o MySQL esteja rodando e que você tenha criado um banco de dados.**

1. Acesse o MySQL:

mysql -u seu-usuario -p


2. Crie um banco de dados:

CREATE DATABASE nome_do_banco_de_dados;


3. Edite o arquivo `.env` para configurar as credenciais de acesso ao banco de dados, por exemplo:

DB_CONNECTION=mysql DB_HOST=127.0.0.1 DB_PORT=3306 DB_DATABASE=nome_do_banco_de_dados DB_USERNAME=seu-usuario DB_PASSWORD=sua-senha


### 6. Execute as migrações e seeds

Rode as migrações e seeds para preparar o banco de dados:

php artisan migrate --seed


### 7. Inicie o servidor

Inicie o servidor de desenvolvimento do Laravel:

php artisan serve


## Rodando o Frontend

### 1. Acesse o diretório do frontend

Navegue até o diretório do frontend:

cd frontend


### 2. Instale as dependências

Instale as dependências do projeto usando o NPM:

npm install


### 3. Inicie o servidor de desenvolvimento

Inicie o servidor de desenvolvimento do frontend:

npm start



## Pronto!

Agora você deve ter tanto o backend quanto o frontend rodando. Acesse o projeto no navegador através do endereço fornecido pelo comando `php artisan serve` para o backend e `npm start` para o frontend.
