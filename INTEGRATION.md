# 🔗 Guia de Integração Frontend ↔ Backend

Este guia explica como conectar o frontend React ao backend API, substituindo os dados mock por dados reais da base de dados.

## 📋 Pré-requisitos

- ✅ Backend configurado e a correr (`npm run dev` em `backend/`)
- ✅ Base de dados PostgreSQL com dados
- ✅ Frontend instalado (`npm install` em `frontend/`)

## 🎯 Objetivo

Atualmente o frontend usa dados mock de `frontend/constants.ts`. Vamos substituir isso por chamadas à API.

## 🔧 Passo 1: Criar Serviço de API no Frontend

### 1.1. Criar pasta de serviços

```bash
cd frontend
mkdir src/services
```

### 1.2. Criar `frontend/src/services/api.ts`

```typescript
// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper para fazer requests
async function fetchAPI(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// === Employees ===
export const employeesAPI = {
  getAll: () => fetchAPI('/employees'),
  getById: (id: string) => fetchAPI(`/employees/${id}`),
  create: (data: any) => fetchAPI('/employees', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => fetchAPI(`/employees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchAPI(`/employees/${id}`, {
    method: 'DELETE',
  }),
};

// === Departments ===
export const departmentsAPI = {
  getAll: () => fetchAPI('/departments'),
  getById: (id: string) => fetchAPI(`/departments/${id}`),
  getEmployees: (id: string) => fetchAPI(`/departments/${id}/employees`),
};

// === Recruitment ===
export const recruitmentAPI = {
  getAllJobs: () => fetchAPI('/recruitment/jobs'),
  getJobById: (id: string) => fetchAPI(`/recruitment/jobs/${id}`),
  getAllCandidates: () => fetchAPI('/recruitment/candidates'),
  getCandidatesByJob: (jobId: string) =>
    fetchAPI(`/recruitment/jobs/${jobId}/candidates`),
  updateCandidateStatus: (id: string, status: string) =>
    fetchAPI(`/recruitment/candidates/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
};

// === Trainings ===
export const trainingsAPI = {
  getAll: () => fetchAPI('/trainings'),
  getById: (id: string) => fetchAPI(`/trainings/${id}`),
  enroll: (id: string, employeeId: string) =>
    fetchAPI(`/trainings/${id}/enroll`, {
      method: 'POST',
      body: JSON.stringify({ employeeId }),
    }),
};

// === Evaluations ===
export const evaluationsAPI = {
  getAll: () => fetchAPI('/evaluations'),
  getByEmployee: (employeeId: string) =>
    fetchAPI(`/evaluations/employee/${employeeId}`),
  create: (data: any) => fetchAPI('/evaluations', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};
```

### 1.3. Criar variável de ambiente

Criar `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🔄 Passo 2: Substituir Dados Mock nos Componentes

### Exemplo: EmployeeList.tsx

**ANTES (com dados mock):**
```typescript
import { MOCK_EMPLOYEES } from '../constants';

function EmployeeList() {
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  // ...
}
```

**DEPOIS (com API):**
```typescript
import { useEffect, useState } from 'react';
import { employeesAPI } from '../services/api';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEmployees() {
      try {
        setLoading(true);
        const data = await employeesAPI.getAll();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
        console.error('Erro ao carregar colaboradores:', err);
      } finally {
        setLoading(false);
      }
    }

    loadEmployees();
  }, []);

  if (loading) return <div>A carregar...</div>;
  if (error) return <div>Erro: {error}</div>;

  // ... resto do componente
}
```

## 📝 Passo 3: Atualizar Todos os Componentes

Precisa de atualizar os seguintes ficheiros em `frontend/components/`:

- ✅ `EmployeeList.tsx` - usar `employeesAPI.getAll()`
- ✅ `EmployeeDetail.tsx` - usar `employeesAPI.getById(id)`
- ✅ `DepartmentList.tsx` - usar `departmentsAPI.getAll()`
- ✅ `DepartmentDetail.tsx` - usar `departmentsAPI.getById(id)`
- ✅ `RecruitmentList.tsx` - usar `recruitmentAPI.getAllJobs()` e `getAllCandidates()`
- ✅ `JobDetail.tsx` - usar `recruitmentAPI.getJobById(id)`
- ✅ `TrainingList.tsx` - usar `trainingsAPI.getAll()`
- ✅ `TrainingDetail.tsx` - usar `trainingsAPI.getById(id)`
- ✅ `EvaluationList.tsx` - usar `evaluationsAPI.getAll()`
- ✅ `EvaluationForm.tsx` - usar `evaluationsAPI.create(data)`

## 🎨 Passo 4: Adicionar Estados de Loading e Erro

Template para todos os componentes:

```typescript
import { useEffect, useState } from 'react';
import { apiService } from '../services/api';

function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const result = await apiService.getData();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded">
        ❌ Erro: {error}
      </div>
    );
  }

  // Render normal
  return <div>{/* ... */}</div>;
}
```

## 🔍 Passo 5: Configurar Proxy (Opcional)

Se tiver problemas de CORS, adicione proxy no `frontend/vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
```

E altere `api.ts`:
```typescript
const API_BASE_URL = '/api'; // Remove http://localhost:5000
```

## ✅ Passo 6: Testar

1. **Backend a correr:**
   ```bash
   cd backend
   npm run dev
   # Deve mostrar: 🚀 HR Pro API Server
   ```

2. **Frontend a correr:**
   ```bash
   cd frontend
   npm run dev
   # Abrir http://localhost:3000
   ```

3. **Testar funcionalidades:**
   - Listar colaboradores
   - Ver detalhes de um colaborador
   - Listar departamentos
   - Ver vagas de recrutamento
   - etc.

## 🐛 Troubleshooting

### "Failed to fetch"
- ✅ Backend está a correr?
- ✅ URL correta em `.env.local`?
- ✅ CORS configurado no backend?

### "CORS policy error"
- ✅ Backend tem `cors()` configurado
- ✅ Ou usar proxy no Vite (ver Passo 5)

### "404 Not Found"
- ✅ Endpoint existe no backend?
- ✅ URL está correta?

### Dados não aparecem
- ✅ Abrir DevTools → Network
- ✅ Ver se API retorna dados
- ✅ Console tem erros?

## 📊 Comparação

| Antes (Mock) | Depois (API) |
|-------------|--------------|
| Dados fixos em `constants.ts` | Dados reais da BD |
| Sem persistência | Alterações guardadas |
| Reload perde tudo | Dados mantêm-se |
| Sem sincronização | Multi-utilizador |

## 🎯 Próximos Passos

Depois de integrar:
- [ ] Adicionar loading states bonitos
- [ ] Adicionar tratamento de erros amigável
- [ ] Implementar paginação (se muitos dados)
- [ ] Adicionar refresh automático
- [ ] Implementar autenticação (login)
- [ ] Adicionar optimistic updates

## 💡 Dica Pro

Use **React Query** ou **SWR** para:
- Cache automático
- Revalidação
- Loading states
- Mutações otimistas

```bash
npm install @tanstack/react-query
```

Boa integração! 🚀
