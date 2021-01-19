const path = require('path');   //dodanie biblioteki
require('dotenv').config()

//Połączenie z bazą
const knex = {
    client: 'mysql',
    connection:{
        timezone: 'UTC+01:00',
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB
    },
    migrations:{    //gdyby sie chcialo otworzyc na innym komputerze, migracja zapewnia bezpieczenstwo
        directory: path.join(__dirname, 'src', 'migrations')    //twoj katalog, ze beda w katalogu source
    }
}

module.exports = knex;  //modul eksportuje obiekt