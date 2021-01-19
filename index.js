const express = require('express');
const api = require('./src/api');
const cookieParser = require('cookie-parser');
const config = require('./config');
const errorHandler = require("./src/middlewares/errorHandler");
const datebaseErrorHandler = require('./src/middlewares/databaseErrorHandler');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerOptions');

require('dotenv').config()

const port = process.env.PORT || 9000;
const env = process.env.NODE_ENV || 'development';
const app = express();

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(express.json());
app.use(cookieParser(config.cookiesSecret));
app.use('/api',api);

app.use(datebaseErrorHandler)
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send({msg:'Witam'})
})

app.listen(port, '127.0.0.1', () => {
    console.log(`Server listening on http://127.0.0.1:${port} in ${env} mode`);
})

module.exports = app;