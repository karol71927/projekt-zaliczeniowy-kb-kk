const path = require('path');   //dodanie biblioteki

//Połączenie z bazą
const knex = {
    client: 'mysql',
    connection:{
        host: '127.0.0.1',
        user: 'lubimyczytac',
        password: 'lubimyczytac',
        database: 'lubimyczytac'
    },
    migrations:{    //gdyby sie chcialo otworzyc na innym komputerze, migracja zapewnia bezpieczenstwo
        directory: path.join(__dirname, 'src', 'migrations')    //twoj katalog, ze beda w katalogu source
    }
}

module.exports = knex;  //modul eksportuje obiekt