import { Request, Response } from 'express';
import { pool } from '../config/database';
import { Employee } from '../types';

/**
 * IMPORTANTE: Estas queries SQL são EXEMPLOS e devem ser ajustadas
 * de acordo com o esquema real da sua base de dados.
 *
 * Quando copiar os ficheiros SQL para a pasta database/, atualize
 * os nomes das tabelas e colunas conforme necessário.
 */

// GET /api/employees - Listar todos os colaboradores
export async function getAllEmployees(req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        full_name as "fullName",
        nif,
        email,
        phone,
        address,
        birth_date as "birthDate",
        department,
        role,
        admission_date as "admissionDate",
        avatar_url as "avatarUrl"
      FROM employees
      ORDER BY full_name
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar colaboradores:', error);
    res.status(500).json({
      error: 'Erro ao buscar colaboradores',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

// GET /api/employees/:id - Buscar colaborador por ID
export async function getEmployeeById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    // Buscar dados básicos do colaborador
    const employeeResult = await pool.query(`
      SELECT
        id,
        full_name as "fullName",
        nif,
        email,
        phone,
        address,
        birth_date as "birthDate",
        department,
        role,
        admission_date as "admissionDate",
        avatar_url as "avatarUrl"
      FROM employees
      WHERE id = $1
    `, [id]);

    if (employeeResult.rows.length === 0) {
      return res.status(404).json({ error: 'Colaborador não encontrado' });
    }

    const employee = employeeResult.rows[0];

    // Buscar dados financeiros
    const financialsResult = await pool.query(`
      SELECT
        base_salary_gross as "baseSalaryGross",
        net_salary as "netSalary",
        deductions
      FROM employee_financials
      WHERE employee_id = $1
    `, [id]);

    // Buscar benefícios
    const benefitsResult = await pool.query(`
      SELECT id, type, value
      FROM employee_benefits
      WHERE employee_id = $1
    `, [id]);

    // Buscar histórico salarial
    const salaryHistoryResult = await pool.query(`
      SELECT date, amount, reason
      FROM salary_history
      WHERE employee_id = $1
      ORDER BY date DESC
    `, [id]);

    // Buscar férias
    const vacationsResult = await pool.query(`
      SELECT
        total_days as "totalDays",
        used_days as "usedDays"
      FROM employee_vacations
      WHERE employee_id = $1
    `, [id]);

    // Buscar histórico de férias
    const vacationHistoryResult = await pool.query(`
      SELECT
        id,
        start_date as "startDate",
        end_date as "endDate",
        days_used as "daysUsed",
        status
      FROM vacation_records
      WHERE employee_id = $1
      ORDER BY start_date DESC
    `, [id]);

    // Buscar formações
    const trainingsResult = await pool.query(`
      SELECT id, title, date, status, provider
      FROM employee_trainings
      WHERE employee_id = $1
      ORDER BY date DESC
    `, [id]);

    // Buscar avaliações
    const evaluationsResult = await pool.query(`
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
    `, [id]);

    // Buscar histórico profissional
    const jobHistoryResult = await pool.query(`
      SELECT
        company,
        role,
        start_date as "startDate",
        end_date as "endDate",
        is_internal as "isInternal"
      FROM job_history
      WHERE employee_id = $1
      ORDER BY start_date DESC
    `, [id]);

    // Buscar dependentes
    const dependentsResult = await pool.query(`
      SELECT
        id,
        name,
        relationship,
        birth_date as "birthDate"
      FROM dependents
      WHERE employee_id = $1
    `, [id]);

    // Buscar faltas
    const absencesResult = await pool.query(`
      SELECT id, date, reason, justified
      FROM absences
      WHERE employee_id = $1
      ORDER BY date DESC
    `, [id]);

    // Montar objeto completo
    const fullEmployee: Employee = {
      ...employee,
      financials: {
        baseSalaryGross: financialsResult.rows[0]?.baseSalaryGross || 0,
        netSalary: financialsResult.rows[0]?.netSalary || 0,
        deductions: financialsResult.rows[0]?.deductions || 0,
        benefits: benefitsResult.rows,
        history: salaryHistoryResult.rows
      },
      vacations: {
        totalDays: vacationsResult.rows[0]?.totalDays || 0,
        usedDays: vacationsResult.rows[0]?.usedDays || 0,
        history: vacationHistoryResult.rows
      },
      trainings: trainingsResult.rows,
      evaluations: evaluationsResult.rows,
      jobHistory: jobHistoryResult.rows,
      dependents: dependentsResult.rows,
      absences: absencesResult.rows
    };

    res.json(fullEmployee);
  } catch (error) {
    console.error('Erro ao buscar colaborador:', error);
    res.status(500).json({
      error: 'Erro ao buscar colaborador',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

// POST /api/employees - Criar novo colaborador
export async function createEmployee(req: Request, res: Response) {
  const employeeData = req.body;

  try {
    const result = await pool.query(`
      INSERT INTO employees (
        full_name, nif, email, phone, address,
        birth_date, department, role, admission_date
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `, [
      employeeData.fullName,
      employeeData.nif,
      employeeData.email,
      employeeData.phone,
      employeeData.address,
      employeeData.birthDate,
      employeeData.department,
      employeeData.role,
      employeeData.admissionDate
    ]);

    res.status(201).json({
      message: 'Colaborador criado com sucesso',
      id: result.rows[0].id
    });
  } catch (error) {
    console.error('Erro ao criar colaborador:', error);
    res.status(500).json({
      error: 'Erro ao criar colaborador',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

// PUT /api/employees/:id - Atualizar colaborador
export async function updateEmployee(req: Request, res: Response) {
  const { id } = req.params;
  const employeeData = req.body;

  try {
    const result = await pool.query(`
      UPDATE employees
      SET
        full_name = $1,
        email = $2,
        phone = $3,
        address = $4,
        department = $5,
        role = $6
      WHERE id = $7
      RETURNING id
    `, [
      employeeData.fullName,
      employeeData.email,
      employeeData.phone,
      employeeData.address,
      employeeData.department,
      employeeData.role,
      id
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Colaborador não encontrado' });
    }

    res.json({ message: 'Colaborador atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar colaborador:', error);
    res.status(500).json({
      error: 'Erro ao atualizar colaborador',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

// DELETE /api/employees/:id - Remover colaborador
export async function deleteEmployee(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await pool.query(`
      DELETE FROM employees
      WHERE id = $1
      RETURNING id
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Colaborador não encontrado' });
    }

    res.json({ message: 'Colaborador removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover colaborador:', error);
    res.status(500).json({
      error: 'Erro ao remover colaborador',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}
