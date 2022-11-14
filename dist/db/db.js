import pg from 'pg';
var Pool = pg.Pool;
var user = 'postgres';
var password = '12345';
var host = 'localhost';
var port = 5432;
var database = 'poctype';
var connection = new Pool({
    user: user,
    password: password,
    host: host,
    port: port,
    database: database
});
export default connection;
