import connection from "../db/db.js";

async function getUserById (userId) {
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