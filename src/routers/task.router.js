import express from 'express';
import { create, read } from '../controllers/task.controller.js';

const router = express.Router();

router.post('/task', create);
router.get('/task/:id', read);

export default router;