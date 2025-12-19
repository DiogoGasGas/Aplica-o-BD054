# 📂 Base de Dados - Scripts SQL

Esta pasta destina-se aos **scripts SQL** da sua base de dados PostgreSQL.

## 📝 Instruções

### 1. Copiar os ficheiros SQL para aqui

Copie os ficheiros SQL do seu outro repositório para esta pasta. Exemplos de ficheiros comuns:

```
database/
├── schema.sql          # Definição das tabelas (CREATE TABLE, etc.)
├── constraints.sql     # Chaves primárias, estrangeiras, índices
├── functions.sql       # Funções e procedures PostgreSQL
├── triggers.sql        # Triggers da base de dados
├── views.sql          # Views (se aplicável)
├── data.sql           # Dados iniciais (INSERT)
└── README.md          # Este ficheiro
```

### 2. Estrutura Esperada pelo Backend

O backend (pasta `backend/`) espera que a base de dados tenha as seguintes tabelas principais:

#### Tabelas de Colaboradores
- `employees` - Dados básicos dos colaboradores
- `employee_financials` - Informação financeira (salário, deduções)
- `employee_benefits` - Benefícios
- `salary_history` - Histórico salarial
- `employee_vacations` - Informação de férias
- `vacation_records` - Registos de férias
- `employee_trainings` - Formações dos colaboradores
- `evaluations` - Avaliações de desempenho
- `job_history` - Histórico profissional
- `dependents` - Dependentes
- `absences` - Faltas

#### Outras Tabelas
- `departments` - Departamentos
- `job_openings` - Vagas de emprego
- `candidates` - Candidatos
- `training_programs` - Programas de formação
- `training_enrollments` - Inscrições em formações

### 3. Ajustar os Controllers

**IMPORTANTE:** As queries SQL nos controllers (`backend/src/controllers/`) são **EXEMPLOS**.

Você precisa:
1. Verificar se os **nomes das tabelas** correspondem aos seus scripts SQL
2. Verificar se os **nomes das colunas** estão corretos
3. Ajustar as queries conforme necessário

Exemplo: Se no seu SQL a tabela se chama `funcionarios` em vez de `employees`, edite o controller:

```typescript
// backend/src/controllers/employees.ts
const result = await pool.query(`
  SELECT * FROM funcionarios  -- era "employees"
  WHERE id = $1
`, [id]);
```

### 4. Executar os Scripts

Depois de configurar o backend (ficheiro `.env`), pode executar os scripts SQL diretamente no PostgreSQL:

#### Opção A: Via terminal (psql)
```bash
psql -h SEU_HOST -U SEU_USER -d SUA_DATABASE -f database/schema.sql
psql -h SEU_HOST -U SEU_USER -d SUA_DATABASE -f database/data.sql
```

#### Opção B: Via ferramenta gráfica
- **pgAdmin**: conecte-se e execute os scripts via Query Tool
- **DBeaver**: conecte-se e execute os scripts
- **Outra ferramenta**: que você usa na universidade

#### Opção C: Script automático (criar depois)
Podemos criar um script `database/migrate.sh` se necessário.

### 5. Testar Conexão

Depois de:
1. Copiar os ficheiros SQL para aqui
2. Executar os scripts no PostgreSQL
3. Configurar o backend (`.env`)

Execute:
```bash
cd backend
npm install
npm run dev
```

Se a conexão funcionar, verá:
```
✅ Conexão com PostgreSQL estabelecida com sucesso!
🚀 HR Pro API Server
📡 A correr em: http://localhost:5000
```

## 📋 Checklist

- [ ] Copiei os ficheiros SQL do outro repositório para esta pasta
- [ ] Executei os scripts SQL no PostgreSQL da universidade
- [ ] Verifiquei que as tabelas foram criadas com sucesso
- [ ] Comparei os nomes das tabelas com os controllers do backend
- [ ] Ajustei as queries SQL nos controllers se necessário

## ❓ Dúvidas?

Se tiver problemas:
1. Verifique as credenciais no ficheiro `backend/.env`
2. Confirme que consegue conectar ao PostgreSQL da universidade
3. Veja os logs de erro no terminal quando corre `npm run dev`
