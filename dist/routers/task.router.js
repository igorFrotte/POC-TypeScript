import express from 'express';
import { aggregator, create, delet, read, update } from '../controllers/task.controller.js';
var router = express.Router();
router.post('/task', create);
router.get('/task/:id', read);
router.post('/task/:id', update);
router["delete"]('/task/:id', delet);
router.get('/count/:id', aggregator);
export default router;
