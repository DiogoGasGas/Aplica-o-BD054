import { Request, Response } from 'express';
import { pool } from '../config/database';

// GET /api/evaluations - Listar todas as avaliações
export async function getAllEvaluations(req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        employee_id as "employeeId",
        date,
        score,
        reviewer,
        comments,
        self_evaluation as "selfEvaluation",
        document_url as "documentUrl",
        type
      FROM evaluations
      ORDER BY date DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    res.status(500).json({
      error: 'Erro ao buscar avaliações',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

// GET /api/evaluations/employee/:employeeId - Avaliações de um colaborador
export async function getEvaluationsByEmployee(req: Request, res: Response) {
  const { employeeId } = req.params;

  try {
    const result = await pool.query(`
      SELECT
        id,
        date,
        score,
        reviewer,
        comments,
        self_evaluation as "selfEvaluation",
        document_url as "documentUrl",
        type
      FROM evaluations
      WHERE employee_id = $1
      ORDER BY date DESC
    `, [employeeId]);

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    res.status(500).json({
      error: 'Erro ao buscar avaliações',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

// POST /api/evaluations - Criar nova avaliação
export async function createEvaluation(req: Request, res: Response) {
  const { employeeId, date, score, reviewer, comments, selfEvaluation, type } = req.body;

  try {
    const result = await pool.query(`
      INSERT INTO evaluations (
        employee_id, date, score, reviewer, comments, self_evaluation, type
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `, [employeeId, date, score, reviewer, comments, selfEvaluation, type]);

    res.status(201).json({
      message: 'Avaliação criada com sucesso',
      id: result.rows[0].id
    });
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    res.status(500).json({
      error: 'Erro ao criar avaliação',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}
