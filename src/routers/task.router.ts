import express from 'express';
import { aggregator, create, delet, read, update, readAll } from '../controllers/task.controller.js';

const router = express.Router();

router.post('/task', create);
router.get('/task', readAll);
router.get('/task/:id', read);
router.put('/task/:id', update);
router.delete('/task/:id', delet);
router.get('/count/:id', aggregator);

export default router;