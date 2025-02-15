const { Pool } = require('pg'); // Destructure Pool from pg

const pool = new Pool({
    user: 'postgres',
    password: 'talk_kurdish',
    host: 'localhost',
    database: 'flashcard',
    port: 5432, // Ensure this matches your PostgreSQL configuration
});


pool.connect()
    .then(() => console.log("Connected to the database"))
    .catch(err => console.error("Database connection error", err.stack));

module.exports = pool;
