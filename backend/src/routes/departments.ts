import { Router } from 'express';
import {
  getAllDepartments,
  getDepartmentById,
  getDepartmentEmployees
} from '../controllers/departments';

const router = Router();

/**
 * Rotas para gestão de departamentos
 */

// GET /api/departments - Listar todos
router.get('/', getAllDepartments);

// GET /api/departments/:id - Buscar por ID
router.get('/:id', getDepartmentById);

// GET /api/departments/:id/employees - Listar colaboradores
router.get('/:id/employees', getDepartmentEmployees);

export default router;
