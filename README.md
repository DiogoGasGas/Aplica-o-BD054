# 🏢 HR Pro - Sistema de Gestão de Recursos Humanos

Sistema completo de gestão de RH desenvolvido para o projeto de Bases de Dados da universidade.

## 📁 Estrutura do Projeto

```
Aplicacao-BD054/
├── frontend/          # Aplicação React (interface do utilizador)
├── backend/           # API Node.js/Express (servidor)
├── database/          # Scripts SQL PostgreSQL
└── README.md          # Este ficheiro
```

## 🚀 Configuração Inicial (Passo a Passo)

### Pré-requisitos

- **Node.js** (versão 18 ou superior) - [Instalar aqui](https://nodejs.org/)
- **PostgreSQL** (acesso ao servidor da universidade)
- **Git** (para controlo de versões)

---

### 📝 Passo 1: Configurar a Base de Dados

1. **Copiar os scripts SQL**
   - Copie todos os ficheiros `.sql` do seu repositório de BD para a pasta `database/`
   - Exemplo: `schema.sql`, `data.sql`, etc.

2. **Executar os scripts no PostgreSQL**
   ```bash
   # Opção 1: Via terminal (se tiver acesso direto)
   psql -h SEU_HOST -U SEU_USER -d SUA_DATABASE -f database/schema.sql

   # Opção 2: Via pgAdmin ou outra ferramenta gráfica
   # Conecte-se ao servidor e execute os scripts manualmente
   ```

3. **Verificar que as tabelas foram criadas**
   ```sql
   -- Execute isto no PostgreSQL para confirmar
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public';
   ```

---

### ⚙️ Passo 2: Configurar o Backend (Servidor API)

1. **Navegar para a pasta do backend**
   ```bash
   cd backend
   ```

2. **Instalar dependências**
   ```bash
   npm install
   ```

3. **Criar ficheiro de configuração `.env`**
   ```bash
   cp .env.example .env
   ```

4. **Editar o ficheiro `.env`** com as credenciais da sua BD
   ```env
   # backend/.env
   PORT=5000
   NODE_ENV=development

   # Dados da universidade (PREENCHER COM OS SEUS DADOS)
   DB_HOST=db.universidade.pt
   DB_PORT=5432
   DB_NAME=nome_da_sua_bd
   DB_USER=seu_username
   DB_PASSWORD=sua_password

   JWT_SECRET=chave_secreta_qualquer
   ```

   ⚠️ **IMPORTANTE:** Nunca faça commit do ficheiro `.env`! Ele já está no `.gitignore`.

5. **Verificar nomes das tabelas**
   - Abra os ficheiros em `backend/src/controllers/`
   - Compare os nomes das tabelas nas queries SQL com os da sua base de dados
   - Ajuste se necessário (ex: `employees` vs `funcionarios`)

6. **Iniciar o servidor**
   ```bash
   npm run dev
   ```

   Se tudo correr bem, verá:
   ```
   ✅ Conexão com PostgreSQL estabelecida com sucesso!
   🚀 HR Pro API Server
   📡 A correr em: http://localhost:5000
   ```

---

### 🎨 Passo 3: Configurar o Frontend

1. **Abrir um NOVO terminal** (deixe o backend a correr!)

2. **Navegar para a pasta do frontend**
   ```bash
   cd frontend
   ```

3. **Instalar dependências**
   ```bash
   npm install
   ```

4. **Iniciar a aplicação**
   ```bash
   npm run dev
   ```

   A aplicação abrirá em: `http://localhost:3000`

---

## 🧪 Testar a Integração

1. **Backend** a correr em `http://localhost:5000`
2. **Frontend** a correr em `http://localhost:3000`
3. **Base de dados** conectada e com dados

### Testes Rápidos:

```bash
# Testar health check do backend
curl http://localhost:5000/health

# Testar endpoint de colaboradores
curl http://localhost:5000/api/employees
```

Se receber uma resposta JSON, está tudo a funcionar! 🎉

---

## 📚 Estrutura da API

O backend expõe os seguintes endpoints:

### Colaboradores
- `GET /api/employees` - Listar todos
- `GET /api/employees/:id` - Buscar por ID
- `POST /api/employees` - Criar novo
- `PUT /api/employees/:id` - Atualizar
- `DELETE /api/employees/:id` - Remover

### Departamentos
- `GET /api/departments` - Listar todos
- `GET /api/departments/:id` - Buscar por ID
- `GET /api/departments/:id/employees` - Colaboradores do departamento

### Recrutamento
- `GET /api/recruitment/jobs` - Listar vagas
- `GET /api/recruitment/jobs/:id` - Detalhes da vaga
- `GET /api/recruitment/candidates` - Listar candidatos
- `PUT /api/recruitment/candidates/:id/status` - Atualizar status

### Formações
- `GET /api/trainings` - Listar programas
- `GET /api/trainings/:id` - Detalhes do programa
- `POST /api/trainings/:id/enroll` - Inscrever colaborador

### Avaliações
- `GET /api/evaluations` - Listar todas
- `GET /api/evaluations/employee/:employeeId` - Por colaborador
- `POST /api/evaluations` - Criar nova avaliação

---

## 🔧 Comandos Úteis

### Backend
```bash
cd backend
npm run dev      # Modo desenvolvimento (com hot reload)
npm run build    # Compilar para produção
npm start        # Correr produção
```

### Frontend
```bash
cd frontend
npm run dev      # Modo desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview do build
```

---

## 🐛 Resolução de Problemas

### "Erro ao conectar com PostgreSQL"
- ✅ Verificar credenciais no `backend/.env`
- ✅ Confirmar acesso ao servidor da universidade (VPN?)
- ✅ Testar conexão com `psql` ou pgAdmin

### "Cannot find module 'express'"
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### "Port 5000 already in use"
- Alterar `PORT=5001` no `backend/.env`
- Ou matar o processo: `lsof -ti:5000 | xargs kill`

### Queries SQL não funcionam
- Verificar nomes de tabelas em `backend/src/controllers/`
- Comparar com o schema real da BD
- Ajustar as queries conforme necessário

---

## 📖 Documentação Adicional

- 📂 [Database README](./database/README.md) - Instruções sobre scripts SQL
- 📂 Frontend - Aplicação React com Vite + TypeScript
- 📂 Backend - API RESTful com Express + PostgreSQL

---

## 👨‍💻 Desenvolvimento

### Tecnologias Utilizadas

**Frontend:**
- React 19.2.3
- TypeScript 5.8.2
- Vite 6.2.0
- Tailwind CSS
- Recharts (gráficos)

**Backend:**
- Node.js
- Express 4.x
- TypeScript 5.8.2
- PostgreSQL (pg driver)
- dotenv (variáveis de ambiente)

### Arquitetura

```
Frontend (React)  →  Backend (Express)  →  PostgreSQL
    :3000               :5000                Universidade
```

---

## 📝 Notas Importantes

1. **Nunca faça commit do `.env`** - Contém credenciais sensíveis!
2. **Ajuste as queries SQL** - Os controllers têm queries de exemplo que podem precisar de ajustes
3. **VPN da universidade** - Pode ser necessária para aceder à BD
4. **Scripts SQL** - Copie do outro repositório para `database/`

---

## 🎯 Próximos Passos

- [ ] Copiar ficheiros SQL para `database/`
- [ ] Configurar credenciais em `backend/.env`
- [ ] Testar conexão à base de dados
- [ ] Ajustar queries nos controllers se necessário
- [ ] Conectar frontend ao backend (substituir dados mock)
- [ ] Adicionar autenticação (opcional)
- [ ] Deploy (opcional)

---

## 📧 Ajuda

Se encontrar problemas:
1. Verifique os logs do terminal (backend e frontend)
2. Reveja as configurações do `.env`
3. Confirme que a BD tem as tabelas corretas
4. Teste os endpoints com `curl` ou Postman

Boa sorte com o projeto! 🚀
