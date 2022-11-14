export type TaskEntity = {
    id: number,
    name: string,
    description: string,
    day: string | Date,
    status: string,
    userId: number
};

export type Task = Omit<TaskEntity, "id">;