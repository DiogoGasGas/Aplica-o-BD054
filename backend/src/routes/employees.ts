import { Router } from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../controllers/employees';

const router = Router();

/**
 * Rotas para gestão de colaboradores
 */

// GET /api/employees - Listar todos
router.get('/', getAllEmployees);

// GET /api/employees/:id - Buscar por ID
router.get('/:id', getEmployeeById);

// POST /api/employees - Criar novo
router.post('/', createEmployee);

// PUT /api/employees/:id - Atualizar
router.put('/:id', updateEmployee);

// DELETE /api/employees/:id - Remover
router.delete('/:id', deleteEmployee);

export default router;
