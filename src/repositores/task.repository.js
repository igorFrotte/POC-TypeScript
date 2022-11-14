import connection from "../db/db.js";

async function createTask (userId, name, description, day, status) {
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
    await connection.query(
        `
            SELECT * FROM tasks WHERE id = $1;  
        `,
        [taskId]
    );

    return;
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
    await connection.query(
        `
        SELECT COUNT(id) FROM tasks
        WHERE "userId" = $1;
        `,
        [userId]
    );

    return;
}

export {
    createTask,
    getTaskById,
    updateStatus,
    deleteTask,
    tasksByUser
};