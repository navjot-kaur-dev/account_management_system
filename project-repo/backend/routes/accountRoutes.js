import express from 'express';
import { getBalance, transfer, getStatement } from '../controllers/accountController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/balance', protect, getBalance);
router.post('/transfer', protect, transfer);
router.get('/statement', protect, getStatement);

export default router;