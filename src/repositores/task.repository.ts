import connection from "../db/db.js";
import { QueryResult } from 'pg';
import { Task, TaskEntity } from '../protocols/task.js';
import { Count } from '../protocols/count.js';

async function createTask ( task : Task ) :Promise<void> {
    await connection.query(
        `
            INSERT INTO tasks 
                (name, description, day, status, "userId") 
            VALUES 
                ($1, $2, $3, $4, $5);  
        `,
        [task.name, task.description, task.day, task.status, task.userId]
    );

    return;
}

async function getAll () :Promise<QueryResult<TaskEntity>> {
    return await connection.query(
        `
            SELECT * FROM tasks;  
        `
    );
}

async function getTaskById (taskId : Number) :Promise<QueryResult<TaskEntity>> {
    return await connection.query(
        `
            SELECT * FROM tasks WHERE id = $1;  
        `,
        [taskId]
    );
}

async function updateStatus (taskId : Number) :Promise<void> {
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

async function deleteTask (taskId : Number) :Promise<void> {
    await connection.query(
        `
        DELETE FROM tasks
        WHERE id = $1;
        `,
        [taskId]
    );

    return;
}

async function tasksByUser (userId : Number) :Promise<QueryResult<Count>> {
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
    getAll,
    updateStatus,
    deleteTask,
    tasksByUser
};