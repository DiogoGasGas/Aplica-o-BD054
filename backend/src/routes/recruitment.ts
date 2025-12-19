import { Router } from 'express';
import {
  getAllJobs,
  getJobById,
  getAllCandidates,
  getCandidatesByJob,
  updateCandidateStatus
} from '../controllers/recruitment';

const router = Router();

/**
 * Rotas para gestão de recrutamento
 */

// Vagas
router.get('/jobs', getAllJobs);
router.get('/jobs/:id', getJobById);
router.get('/jobs/:jobId/candidates', getCandidatesByJob);

// Candidatos
router.get('/candidates', getAllCandidates);
router.put('/candidates/:id/status', updateCandidateStatus);

export default router;
