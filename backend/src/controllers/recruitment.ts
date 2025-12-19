import { Request, Response } from 'express';
import { pool } from '../config/database';

// GET /api/recruitment/jobs - Listar todas as vagas
export async function getAllJobs(req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        title,
        department,
        open_date as "openDate",
        status,
        description,
        requirements
      FROM job_openings
      ORDER BY open_date DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar vagas:', error);
    res.status(500).json({
      error: 'Erro ao buscar vagas',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

// GET /api/recruitment/jobs/:id - Buscar vaga por ID
export async function getJobById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await pool.query(`
      SELECT
        id,
        title,
        department,
        open_date as "openDate",
        status,
        description,
        requirements
      FROM job_openings
      WHERE id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vaga não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar vaga:', error);
    res.status(500).json({
      error: 'Erro ao buscar vaga',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

// GET /api/recruitment/candidates - Listar todos os candidatos
export async function getAllCandidates(req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        job_id as "jobId",
        name,
        email,
        phone,
        status,
        applied_date as "appliedDate",
        recruiter_id as "recruiterId",
        cv_url as "cvUrl",
        cover_letter as "coverLetter"
      FROM candidates
      ORDER BY applied_date DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar candidatos:', error);
    res.status(500).json({
      error: 'Erro ao buscar candidatos',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

// GET /api/recruitment/jobs/:jobId/candidates - Candidatos de uma vaga
export async function getCandidatesByJob(req: Request, res: Response) {
  const { jobId } = req.params;

  try {
    const result = await pool.query(`
      SELECT
        id,
        job_id as "jobId",
        name,
        email,
        phone,
        status,
        applied_date as "appliedDate",
        recruiter_id as "recruiterId"
      FROM candidates
      WHERE job_id = $1
      ORDER BY applied_date DESC
    `, [jobId]);

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar candidatos:', error);
    res.status(500).json({
      error: 'Erro ao buscar candidatos',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

// PUT /api/recruitment/candidates/:id/status - Atualizar status do candidato
export async function updateCandidateStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(`
      UPDATE candidates
      SET status = $1
      WHERE id = $2
      RETURNING id
    `, [status, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Candidato não encontrado' });
    }

    res.json({ message: 'Status atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).json({
      error: 'Erro ao atualizar status',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}
