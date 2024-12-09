const mysql = require('mysql2');


const pool = mysql.createPool({

    host: 'localhost', // Cambiar si el contenedor tiene un host diferente

    user: 'myuser', 

    password: '12345',

    database: 'ordinario_modelo_admin',

});


module.exports = pool.promise()

