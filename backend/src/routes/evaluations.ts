import { Router } from 'express';
import {
  getAllEvaluations,
  getEvaluationsByEmployee,
  createEvaluation
} from '../controllers/evaluations';

const router = Router();

/**
 * Rotas para gestão de avaliações
 */

router.get('/', getAllEvaluations);
router.get('/employee/:employeeId', getEvaluationsByEmployee);
router.post('/', createEvaluation);

export default router;
