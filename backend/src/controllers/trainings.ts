import { Request, Response } from 'express';
import { pool } from '../config/database';

// GET /api/trainings - Listar todos os programas de formação
export async function getAllTrainings(req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        title,
        description,
        start_date as "startDate",
        end_date as "endDate",
        status,
        provider
      FROM training_programs
      ORDER BY start_date DESC
    `);

    // Para cada programa, buscar colaboradores inscritos
    const trainingsWithEnrollments = await Promise.all(
      result.rows.map(async (training) => {
        const enrollments = await pool.query(`
          SELECT employee_id
          FROM training_enrollments
          WHERE training_id = $1
        `, [training.id]);

        return {
          ...training,
          enrolledEmployeeIds: enrollments.rows.map(e => e.employee_id)
        };
      })
    );

    res.json(trainingsWithEnrollments);
  } catch (error) {
    console.error('Erro ao buscar formações:', error);
    res.status(500).json({
      error: 'Erro ao buscar formações',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

// GET /api/trainings/:id - Buscar formação por ID
export async function getTrainingById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await pool.query(`
      SELECT
        id,
        title,
        description,
        start_date as "startDate",
        end_date as "endDate",
        status,
        provider
      FROM training_programs
      WHERE id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Formação não encontrada' });
    }

    const training = result.rows[0];

    // Buscar colaboradores inscritos
    const enrollments = await pool.query(`
      SELECT employee_id
      FROM training_enrollments
      WHERE training_id = $1
    `, [id]);

    res.json({
      ...training,
      enrolledEmployeeIds: enrollments.rows.map(e => e.employee_id)
    });
  } catch (error) {
    console.error('Erro ao buscar formação:', error);
    res.status(500).json({
      error: 'Erro ao buscar formação',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

// POST /api/trainings/:id/enroll - Inscrever colaborador numa formação
export async function enrollEmployee(req: Request, res: Response) {
  const { id } = req.params;
  const { employeeId } = req.body;

  try {
    await pool.query(`
      INSERT INTO training_enrollments (training_id, employee_id)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
    `, [id, employeeId]);

    res.json({ message: 'Colaborador inscrito com sucesso' });
  } catch (error) {
    console.error('Erro ao inscrever colaborador:', error);
    res.status(500).json({
      error: 'Erro ao inscrever colaborador',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}
