import pg from 'pg';

const { Pool } = pg;

const connection = new Pool({
  user: 'postgres',
  password: '12345',
  host: 'localhost',
  port: 5432,
  database: 'poctype'
});

 export default connection;