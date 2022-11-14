import { taskSchema } from "../schemas/task.schema.js";
import { createTask, getTaskById, updateStatus, deleteTask, tasksByUser } from "../repositores/task.repository.js";
import { getUserById } from "../repositores/user.repository.js";
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
      return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

async function read(req, res) {
    const { id } = req.params;

    if(isNaN(id)) return res.status(STATUS_CODE.BAD_REQUEST).send("Id must be a number");
  
    try {
      const task = (await getTaskById(id)).rows;
      if (!task.length) return res.status(STATUS_CODE.NOT_FOUND).send("Task not found");

      return res.status(STATUS_CODE.OK).send(task[0]);
    } catch (error) {
      return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

async function update(req, res) {
    const { id } = req.params;

    if(isNaN(id)) return res.status(STATUS_CODE.BAD_REQUEST).send("Id must be a number");
  
    try {
      const task = (await getTaskById(id)).rows;
      if (!task.length) return res.status(STATUS_CODE.NOT_FOUND).send("Task not found");
      if (task[0].status === "completed") return res.status(STATUS_CODE.CONFLICT).send("Task is already completed");

      await updateStatus(id);
  
      return res.status(STATUS_CODE.OK).send("Task completed");
    } catch (error) {
      return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

export { create, read, update };