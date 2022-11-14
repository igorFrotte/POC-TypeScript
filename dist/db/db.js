import pg from 'pg';
var Pool = pg.Pool;
var connection = new Pool({
    user: 'postgres',
    password: '12345',
    host: 'localhost',
    port: 5432,
    database: 'poctype'
});
export default connection;
