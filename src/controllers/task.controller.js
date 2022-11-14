import { taskSchema } from "../schemas/task.schema.js";
import { createTask, getTaskById, updateStatus, deleteTask, tasksByUser } from "../repositores/task.repository.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function create(req, res) {
    const { name, description, day, status, userId } = req.body;
    const validation = taskSchema.validate(req.body);
  
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(STATUS_CODE.UNPROCESSABLE).send(errors);
    }  
  
    try {
      await createTask(name, description, day, status, userId);
  
      return res.sendStatus(STATUS_CODE.CREATED);
    } catch (error) {
      return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export { create };