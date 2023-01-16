# Desafio Sharenergy API-backend
*Aplicação em Nodejs para acesso a rotas e outras APIs como: [Random User Generator](https://randomuser.me/), [HTTP Cat](https://http.cat/) e [Random Dog](https://random.dog/).*

## Modules
[bcrypt](https://www.npmjs.com/package/bcrypt) <br>
[cors](https://www.npmjs.com/package/cors)<br>
[express](https://www.npmjs.com/package/express) <br>
[express-validator](https://www.npmjs.com/package/express-validator) <br>
[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) <br>
[mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator)<br>
[swagger-autogen](https://www.npmjs.com/package/swagger-autogen)<br>
[swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)<br>

## Dev module
[nodemon](https://www.npmjs.com/package/nodemon)<br>


## Options
*O servidor de desenvolvimento precisa do arquivo nodemon.json na raiz da pasta, para ter acesso a algum serviço com MongoDB.*<br>
É necessário criar o arquivo <b>nodemon.json</b> e inserir as credenciais para acesso ao banco na variável <b>env</b>.<br>
Além disso, é necessário informar uma <b>chave secreta</b> para utilizar o jsonwebtoken.

### Exemplo de arquivo
<pre><code>{
  "env": {
    "DB_USER": "DB_USER_NAME",
    "DB_PASSWORD": "DB_USER_PASSWORD",
    "DB_NAME": "DB_NAME",
    "DB_CLUSTER": "DB_CLUSTER_URL",
    "JWT_KEY": "YOUR_SECRET_KEY"
  }
}
</code></pre>

## Swagger docs link
<b>http://localhost:5000/doc</b>

## Update swagger docs
Qualquer alteração feita no arquivo swagger.js ou nos controladores da aplicação, devem ser refletidas no swagger, executando o código abaixo:
<pre><code>npm run swagger-autogen</code></pre>

## Start project
Para iniciar a aplicação:
<pre><code>npm start</code></pre>