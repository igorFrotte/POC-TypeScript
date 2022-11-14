import connection from "../db/db.js";
import { QueryResult } from 'pg';
import { UserEntity } from "../protocols/user.js";

async function getUserById (userId : Number) :Promise<QueryResult<UserEntity>> {
    return await connection.query(
        `
            SELECT * FROM users WHERE id = $1;  
        `,
        [userId]
    );
}

export {
    getUserById
};