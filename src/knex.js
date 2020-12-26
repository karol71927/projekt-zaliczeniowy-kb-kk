const knexConfig = require('../knexfile'); //obiekt zawiera konfiguracje z tego pliku
const knex = require('knex')(knexConfig); //inicjalizacja knexa
module.exports = knex;  //eksport knexa