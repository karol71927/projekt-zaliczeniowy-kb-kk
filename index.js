const express = require('express');

const port = 9000;
const env = process.env.NODE_ENV || 'development';
const app = express();

app.get('/', (req, res) => {
    res.send({msg:'Witam'})
})

app.listen(port, '127.0.0.1', () => {
    console.log(`Server listening on http://127.0.0.1:${port} in ${env} mode`);
})