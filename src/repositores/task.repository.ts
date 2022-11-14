import connection from "../db/db.js";

async function createTask (name, description, day, status, userId ) {
    await connection.query(
        `
            INSERT INTO tasks 
                (name, description, day, status, "userId") 
            VALUES 
                ($1, $2, $3, $4, $5);  
        `,
        [name, description, day, status, userId]
    );

    return;
}

async function getTaskById (taskId) {
    return await connection.query(
        `
            SELECT * FROM tasks WHERE id = $1;  
        `,
        [taskId]
    );
}

async function updateStatus (taskId) {
    await connection.query(
        `
        UPDATE tasks SET
        status = 'completed'
        WHERE id = $1;
        `,
        [taskId]
    );

    return;
}

async function deleteTask (taskId) {
    await connection.query(
        `
        DELETE FROM tasks
        WHERE id = $1;
        `,
        [taskId]
    );

    return;
}

async function tasksByUser (userId) {
    return await connection.query(
        `
        SELECT COUNT(id) AS quant FROM tasks
        WHERE "userId" = $1;
        `,
        [userId]
    );
}

export {
    createTask,
    getTaskById,
    updateStatus,
    deleteTask,
    tasksByUser
};