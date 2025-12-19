import { Request, Response } from 'express';
import { pool } from '../config/database';

// GET /api/departments - Listar todos os departamentos
export async function getAllDepartments(req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        manager_id as "managerId",
        description
      FROM departments
      ORDER BY id
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar departamentos:', error);
    res.status(500).json({
      error: 'Erro ao buscar departamentos',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

// GET /api/departments/:id - Buscar departamento por ID
export async function getDepartmentById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await pool.query(`
      SELECT
        id,
        manager_id as "managerId",
        description
      FROM departments
      WHERE id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Departamento não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar departamento:', error);
    res.status(500).json({
      error: 'Erro ao buscar departamento',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

// GET /api/departments/:id/employees - Listar colaboradores de um departamento
export async function getDepartmentEmployees(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await pool.query(`
      SELECT
        id,
        full_name as "fullName",
        email,
        role
      FROM employees
      WHERE department = $1
      ORDER BY full_name
    `, [id]);

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar colaboradores do departamento:', error);
    res.status(500).json({
      error: 'Erro ao buscar colaboradores',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}
