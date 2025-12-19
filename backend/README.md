# 🔧 Backend - HR Pro API

API RESTful para o sistema de gestão de recursos humanos.

## 🚀 Início Rápido

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com as suas credenciais

# Modo desenvolvimento (com hot reload)
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

## 📁 Estrutura

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts      # Configuração PostgreSQL
│   ├── controllers/         # Lógica dos endpoints
│   │   ├── employees.ts
│   │   ├── departments.ts
│   │   ├── recruitment.ts
│   │   ├── trainings.ts
│   │   └── evaluations.ts
│   ├── routes/              # Definição das rotas
│   │   ├── employees.ts
│   │   ├── departments.ts
│   │   ├── recruitment.ts
│   │   ├── trainings.ts
│   │   └── evaluations.ts
│   ├── types/
│   │   └── index.ts         # Tipos TypeScript
│   └── server.ts            # Entrada principal
├── .env.example             # Template de variáveis
├── .gitignore
├── package.json
└── tsconfig.json
```

## ⚙️ Configuração

### 1. Variáveis de Ambiente (.env)

```env
PORT=5000
NODE_ENV=development

# PostgreSQL (preencher com dados da universidade)
DB_HOST=db.universidade.pt
DB_PORT=5432
DB_NAME=hr_database
DB_USER=seu_username
DB_PASSWORD=sua_password

JWT_SECRET=chave_secreta_forte
```

### 2. Ajustar Queries SQL

**IMPORTANTE:** As queries em `src/controllers/` são EXEMPLOS!

Compare os nomes das tabelas e colunas com o seu schema real:

```typescript
// Exemplo: se sua tabela é 'funcionarios' e não 'employees'
// Edite src/controllers/employees.ts:

const result = await pool.query(`
  SELECT * FROM funcionarios  -- era 'employees'
  WHERE id = $1
`, [id]);
```

## 🔌 API Endpoints

### Health Check
- `GET /health` - Status do servidor

### Colaboradores
- `GET /api/employees` - Listar todos
- `GET /api/employees/:id` - Detalhes completos
- `POST /api/employees` - Criar novo
- `PUT /api/employees/:id` - Atualizar
- `DELETE /api/employees/:id` - Remover

### Departamentos
- `GET /api/departments` - Listar todos
- `GET /api/departments/:id` - Detalhes
- `GET /api/departments/:id/employees` - Colaboradores

### Recrutamento
- `GET /api/recruitment/jobs` - Vagas abertas
- `GET /api/recruitment/jobs/:id` - Detalhes vaga
- `GET /api/recruitment/jobs/:jobId/candidates` - Candidatos
- `GET /api/recruitment/candidates` - Todos candidatos
- `PUT /api/recruitment/candidates/:id/status` - Atualizar status

### Formações
- `GET /api/trainings` - Programas de formação
- `GET /api/trainings/:id` - Detalhes programa
- `POST /api/trainings/:id/enroll` - Inscrever colaborador

### Avaliações
- `GET /api/evaluations` - Todas avaliações
- `GET /api/evaluations/employee/:employeeId` - Por colaborador
- `POST /api/evaluations` - Nova avaliação

## 🧪 Testar

```bash
# Health check
curl http://localhost:5000/health

# Listar colaboradores
curl http://localhost:5000/api/employees

# Buscar colaborador específico
curl http://localhost:5000/api/employees/1

# Criar colaborador (POST)
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{"fullName":"João Silva","email":"joao@example.com",...}'
```

## 🔒 Segurança

O servidor já inclui:
- ✅ **Helmet** - Headers de segurança HTTP
- ✅ **CORS** - Controlo de acesso cross-origin
- ✅ **Rate Limiting** - Proteção contra ataques
- ✅ **SQL Injection Protection** - Queries parametrizadas ($1, $2)

## 🐛 Debugging

### Logs
Todas as queries SQL são automaticamente logadas no console:
```
Query executada: { text: 'SELECT...', duration: 15, rows: 42 }
```

### Testar Conexão BD
```bash
npm run dev
# Procure por: ✅ Conexão com PostgreSQL estabelecida com sucesso!
```

### Erros Comuns

**"ECONNREFUSED"**
- A BD não está acessível
- Verificar credenciais, VPN, firewall

**"relation 'employees' does not exist"**
- Scripts SQL não foram executados
- Ou nome da tabela está errado (ajustar controller)

**"column 'full_name' does not exist"**
- Nome da coluna diferente no schema
- Ajustar queries nos controllers

## 📦 Dependências Principais

- **express** - Framework web
- **pg** - Driver PostgreSQL
- **dotenv** - Variáveis de ambiente
- **cors** - Cross-Origin Resource Sharing
- **helmet** - Segurança HTTP
- **typescript** - Type safety

## 🚀 Deploy (Opcional)

Para deploy em produção:

```bash
# Build
npm run build

# Executar
NODE_ENV=production npm start
```

Serviços recomendados:
- **Render.com** - Grátis, fácil
- **Railway.app** - Grátis com PostgreSQL
- **Heroku** - Clássico (pago)

## 📝 Notas

1. O servidor usa **pool de conexões** para performance
2. Todas as queries usam **prepared statements** (proteção SQL injection)
3. Logs automáticos de todas as operações
4. Configurado para **hot reload** em desenvolvimento
