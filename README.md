# 🎓 Projeto BD054 - Sistema de Gestão de Recursos Humanos

Sistema completo de gestão de RH integrado com PostgreSQL para o projeto de Bases de Dados da universidade.

## ⚡ CONFIGURAÇÃO COMPLETA ✅

**Tudo já está preparado e pronto a usar!**
- ✅ Credenciais da base de dados configuradas
- ✅ Dependências instaladas (backend e frontend)
- ✅ Scripts de configuração criados
- ✅ Aplicação pronta para iniciar

---

## 📖 **→ [LEIA O GUIA COMPLETO AQUI: COMO_USAR.md](./COMO_USAR.md) ←**

**O ficheiro COMO_USAR.md contém instruções detalhadas passo a passo para iniciantes!**

---

## 📁 Estrutura do Projeto

```
Aplicacao-BD054/
├── backend/           # API Node.js/Express (servidor)
├── frontend/          # Aplicação React (interface do utilizador)
├── database/          # Scripts SQL PostgreSQL
├── COMO_USAR.md       # 📖 GUIA COMPLETO E DETALHADO
└── README.md          # Este ficheiro
```

## 🚀 Início Rápido

### Para começar a trabalhar (depois da configuração inicial):

1. **Conectar à VPN da universidade** (se estiver fora do campus)

2. **Terminal 1 - Iniciar Backend:**
   ```bash
   cd backend
   npm run dev
   ```

3. **Terminal 2 - Iniciar Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Abrir no navegador:** http://localhost:5173

---

## 🔧 Configuração Inicial (Primeira Vez)

**📖 Para instruções completas e detalhadas, consulte [COMO_USAR.md](./COMO_USAR.md)**

### Resumo Rápido:

1. **Configurar base de dados:**
   ```bash
   cd backend
   npm run db:setup
   ```
   ⚠️ Precisa estar conectado à VPN da universidade!

2. **Iniciar backend:**
   ```bash
   npm run dev
   ```

3. **Iniciar frontend** (novo terminal):
   ```bash
   cd frontend
   npm run dev
   ```

4. **Abrir:** http://localhost:5173

---

## 🔗 Informações da Base de Dados

- **Host**: appserver.alunos.di.fc.ul.pt
- **Database**: bd054
- **User**: bd054
- **Port**: 5432

⚠️ **Importante**: Necessário estar conectado à VPN da universidade!

---

## 🔧 Comandos Principais

### Backend
```bash
npm run dev       # Iniciar servidor de desenvolvimento
npm run db:setup  # Configurar/reconfigurar base de dados
```

### Frontend
```bash
npm run dev       # Iniciar aplicação de desenvolvimento
```

---

## 🐛 Resolução de Problemas

**Consulte o ficheiro [COMO_USAR.md](./COMO_USAR.md) para:**
- Instruções detalhadas de resolução de problemas
- FAQs (Perguntas Frequentes)
- Explicações de conceitos para iniciantes
- Guia completo passo a passo

---

## 👨‍💻 Tecnologias Utilizadas

**Frontend:**
- React, TypeScript, Vite

**Backend:**
- Node.js, Express, TypeScript, PostgreSQL (pg driver)

**Base de Dados:**
- PostgreSQL (Servidor da Universidade)

### Arquitetura

```
Frontend (React)  →  Backend (Express)  →  PostgreSQL
  localhost:5173      localhost:5000      appserver.alunos...
```

---

## 📝 Notas Importantes

⚠️ **Nunca faça commit do ficheiro `.env`** - Contém credenciais sensíveis!

✅ **Já está tudo configurado:**
- Credenciais da BD no `backend/.env`
- Dependências instaladas
- Scripts de setup prontos

---

## 🆘 Precisa de Ajuda?

**→ Leia o [COMO_USAR.md](./COMO_USAR.md) para:**
- Guia completo passo a passo
- Resolução de problemas
- Explicações detalhadas para iniciantes

---

**🎉 Boa sorte com o seu projeto de Bases de Dados!** 🚀
