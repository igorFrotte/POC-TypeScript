import express from 'express';
import { create } from '../controllers/task.controller.js';

const router = express.Router();

router.post('/task', create);

export default router;