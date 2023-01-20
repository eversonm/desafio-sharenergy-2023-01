# Desafio Sharenergy API-backend
*Aplicação em React para o desafio*


![](front-end-react.gif)

## Modules
[React](https://pt-br.reactjs.org/) <br>
[ReactDOM](https://pt-br.reactjs.org/docs/react-dom.html)<br>
[react-paginate](https://www.npmjs.com/package/react-paginate) <br>
[react-progressive-graceful-image](https://www.npmjs.com/package/react-progressive-graceful-image) <br>
[react-router-dom v5](https://reactrouter.com/en/main) <br>
[react-transition-group](https://reactcommunity.org/react-transition-group/)<br>


## Executar apenas o front-end
*O servidor de desenvolvimento precisa do arquivo .env na raiz da pasta.*<br>
Para criar executar <b>apenas</b> a aplicação do front-end, é preciso criar o arquivo <b>.env</b> e utilizar o [backend](https://github.com/eversonm/desafio-sharenergy-2023-01/tree/everson-magalhaes-cavalcante/back-end) ou uma estrutura similar.

### Exemplo de arquivo
<pre><code>REACT_APP_BACKEND_URL=http://localhost:5000/api
</code></pre>

## Iniciar a aplicação localmente
Para iniciar a aplicação:
<pre><code>npm install
npm start</code></pre>

## Swagger docs link
Para testar a aplicação: 
<b>http://localhost:3000/</b> 
<br>

## Rotas utilizadas na aplicação
+ [Cats](http://localhost:5000/cats) - produz imagens de gatos de acordo com o código HTTP inserido, usando a API HTTP Cat](https://http.cat/)
+ [Users](http://localhost:5000/users) - carrega informações de usuários, permitindo busca por nome, email ou username, usando a API [Random User Generator](https://randomuser.me/)
+ [Dogs](http://localhost:5000/dogs) - carrega imagens aleatórias de cachorros, usando a API [Random Dog](https://random.dog/)
+ [Clients](http://localhost:5000/clients) - CRUD para cadastrar, apagar, editar e trazer todos os clientes, usando Nodejs e MongoDB.