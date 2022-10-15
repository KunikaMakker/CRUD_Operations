import express from 'express';
import { createCause, getAllCause, getSingleCause, updateCause, deleteCause } from '../controllers/cause';

const router = express.Router();

router.post('/causes', createCause);
router.get('/causes', getAllCause);
router.get('/causes/:causeId', getSingleCause);
router.patch('/causes/:causeId', updateCause);
router.delete('/causes/:causeId', deleteCause);

export default router;