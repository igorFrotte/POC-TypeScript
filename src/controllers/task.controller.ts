import { taskSchema } from "../schemas/task.schema.js";
import { createTask, getTaskById, updateStatus, deleteTask, tasksByUser } from "../repositores/task.repository.js";
import { getUserById } from "../repositores/user.repository.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { Request, Response} from "express";

async function create(req: Request, res: Response) {
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

async function read(req: Request, res: Response) {
    const { id } = req.params;

    if(isNaN(Number(id))) return res.status(STATUS_CODE.BAD_REQUEST).send("Id must be a number");
  
    try {
      const task = (await getTaskById(id)).rows;
      if (!task.length) return res.status(STATUS_CODE.NOT_FOUND).send("Task not found");

      return res.status(STATUS_CODE.OK).send(task[0]);
    } catch (error) {
      return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

async function update(req: Request, res: Response) {
    const { id } = req.params;

    if(isNaN(Number(id))) return res.status(STATUS_CODE.BAD_REQUEST).send("Id must be a number");
  
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

async function delet(req: Request, res: Response) {
    const { id } = req.params;

    if(isNaN(Number(id))) return res.status(STATUS_CODE.BAD_REQUEST).send("Id must be a number");
  
    try {
      const task = (await getTaskById(id)).rows;
      if (!task.length) return res.status(STATUS_CODE.NOT_FOUND).send("Task not found");
      
      await deleteTask(id);
  
      return res.status(STATUS_CODE.OK).send("Task was deleted");
    } catch (error) {
      return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

async function aggregator(req: Request, res: Response) {
    const { id } = req.params;

    if(isNaN(Number(id))) return res.status(STATUS_CODE.BAD_REQUEST).send("Id must be a number");
  
    try {
      const user = (await getUserById(id)).rows;
      if (!user.length) return res.status(STATUS_CODE.NOT_FOUND).send("User not found");

      const count = (await tasksByUser(id)).rows;

      return res.status(STATUS_CODE.OK).send(count[0].quant);
    } catch (error) {
      return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

export { create, read, update, delet, aggregator };