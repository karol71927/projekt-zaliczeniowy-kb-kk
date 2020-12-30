const express = require('express');
const api = require('./src/api');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const errorHandler = require("./src/middlewares/errorHandler");
const databaseErrorHandler = require("./src/middlewares/databaseErrorHandler");
const config = require('./config');

const port = process.env.PORT || 9000;
const env = process.env.NODE_ENV || 'development';
const app = express();
app.use(express.json());
app.use(cookieParser(config.cookiesSecret));
app.use('/api', api);
app.use(databaseErrorHandler);
app.use(errorHandler);
app.get('/', (req, res) => {
    res.send({msg:'Witam'})
})

app.listen(port, '127.0.0.1', () => {
    console.log(`Server listening on http://127.0.0.1:${port} in ${env} mode`);
})