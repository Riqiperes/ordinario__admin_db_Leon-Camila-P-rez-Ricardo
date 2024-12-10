const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    port: 33060,
    user: 'myuser',
    password: '12345',
    database: 'ordinario_modelo_admin',
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Database connected');
    connection.release();
});

module.exports = db.promise(); // Exporta la conexión como promesas
