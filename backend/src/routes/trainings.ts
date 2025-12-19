import { Router } from 'express';
import {
  getAllTrainings,
  getTrainingById,
  enrollEmployee
} from '../controllers/trainings';

const router = Router();

/**
 * Rotas para gestão de formações
 */

router.get('/', getAllTrainings);
router.get('/:id', getTrainingById);
router.post('/:id/enroll', enrollEmployee);

export default router;
