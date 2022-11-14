import express from 'express';
import { create, read, update } from '../controllers/task.controller.js';

const router = express.Router();

router.post('/task', create);
router.get('/task/:id', read);
router.post('/task/:id', update);

export default router;