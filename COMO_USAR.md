# 🚀 GUIA COMPLETO - Como Usar a Aplicação BD054

Este guia vai ensinar-lhe passo a passo como fazer a sua aplicação funcionar. Não se preocupe, está tudo explicado de forma simples!

---

## 📋 O que já está pronto?

Já preparei tudo para si:
- ✅ Configuração da base de dados PostgreSQL
- ✅ Ficheiro `.env` com as suas credenciais
- ✅ Instalação de todas as dependências
- ✅ Scripts para carregar a base de dados
- ✅ Servidor backend (API)
- ✅ Aplicação frontend (Interface)

---

## 🎯 PASSO 1: Conectar à VPN da Universidade

**IMPORTANTE:** O servidor da base de dados só funciona dentro da rede da universidade!

### Opção A: Está no campus da universidade
- Conecte-se à rede WiFi da faculdade
- Pode avançar para o Passo 2

### Opção B: Está em casa ou fora do campus
- Precisa de se conectar à VPN da universidade
- Contacte o suporte informático da universidade para obter:
  - Software VPN
  - Credenciais de acesso
  - Instruções de configuração

---

## 🎯 PASSO 2: Carregar a Base de Dados

Agora vamos carregar as tabelas e dados para a base de dados PostgreSQL.

### 2.1 Abrir o Terminal

**No Windows:**
- Pressione `Windows + R`
- Digite `cmd` e pressione Enter
- OU procure por "Terminal" ou "Command Prompt" no menu iniciar

**No Mac:**
- Pressione `Cmd + Espaço`
- Digite "Terminal" e pressione Enter

**No Linux:**
- Pressione `Ctrl + Alt + T`

### 2.2 Navegar até a pasta do projeto

No terminal, digite (uma linha de cada vez):

```bash
cd Aplicacao-BD054
cd backend
```

**O que isto faz?** Move-o para dentro da pasta do projeto.

### 2.3 Executar o script de configuração

Agora digite:

```bash
npm run db:setup
```

**O que isto faz?** Executa o script que carrega todos os seus ficheiros SQL (schema.sql, triggers.sql, procedures.sql, data.sql) para a base de dados.

### 2.4 Verificar se funcionou

Deve ver mensagens como:
```
✅ Conexão estabelecida com sucesso!
✅ Schema (Tabelas, Chaves Primárias e Estrangeiras) - Concluído com sucesso!
✅ Triggers - Concluído com sucesso!
✅ Procedures, Funções e Views - Concluído com sucesso!
✅ Dados (Inserção de registos) - Concluído com sucesso!
✅ BASE DE DADOS CONFIGURADA COM SUCESSO!
```

**⚠️ Se vir erros:**
- Verifique se está conectado à VPN
- Verifique se as credenciais no ficheiro `.env` estão corretas
- Tente executar novamente o comando

---

## 🎯 PASSO 3: Iniciar o Servidor Backend

O backend é o "cérebro" da aplicação que comunica com a base de dados.

### 3.1 No terminal (ainda na pasta `backend`), digite:

```bash
npm run dev
```

**O que isto faz?** Inicia o servidor que vai receber pedidos e comunicar com a base de dados.

### 3.2 Verificar se funcionou

Deve ver:
```
✅ Conexão com PostgreSQL estabelecida com sucesso!
🚀 Servidor a correr em http://localhost:5000
```

**IMPORTANTE:** Deixe este terminal aberto! O servidor precisa de estar sempre a correr.

---

## 🎯 PASSO 4: Iniciar a Aplicação Frontend

O frontend é a interface visual que vai usar para interagir com a aplicação.

### 4.1 Abrir um NOVO terminal

**IMPORTANTE:** Não feche o terminal anterior! Precisa de abrir um novo.

**No Windows:** Abra outra janela do Command Prompt
**No Mac/Linux:** Abra outra janela do Terminal

### 4.2 Navegar até a pasta frontend

No novo terminal, digite:

```bash
cd Aplicacao-BD054
cd frontend
```

### 4.3 Iniciar o frontend

Digite:

```bash
npm run dev
```

**O que isto faz?** Inicia a interface visual da aplicação.

### 4.4 Verificar se funcionou

Deve ver algo como:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 🎯 PASSO 5: Usar a Aplicação

### 5.1 Abrir no navegador

Abra o seu navegador favorito (Chrome, Firefox, Edge, Safari) e vá para:

```
http://localhost:5173
```

### 5.2 Pronto! 🎉

A sua aplicação está a funcionar! Agora pode:
- Ver a lista de funcionários
- Ver departamentos
- Ver avaliações
- Ver formações
- E muito mais!

---

## 📊 Estrutura da Aplicação

```
Aplicacao-BD054/
├── backend/              ← Servidor (comunica com a base de dados)
│   ├── .env             ← Credenciais da base de dados (CRIADO)
│   ├── src/
│   │   ├── server.ts    ← Ficheiro principal do servidor
│   │   ├── config/
│   │   │   └── database.ts    ← Configuração da base de dados
│   │   ├── controllers/       ← Lógica de negócio
│   │   ├── routes/            ← Rotas da API
│   │   └── scripts/
│   │       └── setup-database.js  ← Script de configuração (CRIADO)
│   └── package.json
│
├── frontend/             ← Interface visual
│   ├── src/
│   │   ├── App.tsx      ← Componente principal
│   │   └── components/  ← Componentes da interface
│   └── package.json
│
└── database/             ← Ficheiros SQL
    ├── schema.sql       ← Cria as tabelas
    ├── triggers.sql     ← Cria os triggers
    ├── procedures.sql   ← Cria funções e views
    └── data.sql         ← Insere os dados
```

---

## ❓ Perguntas Frequentes

### Como paro os servidores?

No terminal onde o servidor está a correr, pressione:
- `Ctrl + C` (Windows/Linux)
- `Cmd + C` (Mac)

### Como inicio tudo de novo?

1. Pare os servidores (Ctrl+C em ambos os terminais)
2. No terminal do backend: `npm run dev`
3. No terminal do frontend: `npm run dev`

### Mudei algo na base de dados, como atualizo?

```bash
cd backend
npm run db:setup
```

Isto vai recarregar todos os ficheiros SQL.

### A aplicação não abre no navegador

1. Verifique se ambos os servidores estão a correr
2. Tente aceder a `http://localhost:5173` manualmente
3. Verifique se não tem outro programa a usar a porta 5173

### Erro de conexão com a base de dados

1. ✅ Está conectado à VPN?
2. ✅ O ficheiro `.env` tem as credenciais corretas?
3. ✅ O servidor PostgreSQL está acessível?

Para testar a conexão:
```bash
cd backend
node test-connection-simple.js
```

---

## 🔧 Comandos Úteis

### Backend (pasta backend/)

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Configurar/reconfigurar base de dados
npm run db:setup

# Testar conexão
node test-connection-simple.js

# Compilar para produção
npm run build

# Iniciar em produção
npm start
```

### Frontend (pasta frontend/)

```bash
# Iniciar aplicação de desenvolvimento
npm run dev

# Compilar para produção
npm run build
```

---

## 📝 Resumo Rápido (depois da primeira configuração)

Para trabalhar no projeto, sempre que ligar o computador:

1. **Conectar à VPN da universidade** (se estiver fora do campus)

2. **Terminal 1 - Backend:**
   ```bash
   cd Aplicacao-BD054/backend
   npm run dev
   ```

3. **Terminal 2 - Frontend:**
   ```bash
   cd Aplicacao-BD054/frontend
   npm run dev
   ```

4. **Abrir navegador:** http://localhost:5173

---

## 🆘 Precisa de Ajuda?

Se encontrar algum problema:

1. Leia as mensagens de erro com atenção
2. Verifique se seguiu todos os passos
3. Certifique-se que está conectado à VPN
4. Tente reiniciar os servidores
5. Procure o erro no Google (em inglês funciona melhor!)

---

## 🎓 Conceitos Importantes (Para Aprender)

### O que é o Backend?
É a parte da aplicação que:
- Comunica com a base de dados
- Processa os dados
- Responde aos pedidos do frontend
- Roda no servidor (no seu caso: localhost:5000)

### O que é o Frontend?
É a parte visual que:
- Mostra a interface ao utilizador
- Envia pedidos ao backend
- Apresenta os dados de forma bonita
- Roda no navegador (no seu caso: localhost:5173)

### O que é PostgreSQL?
É o sistema de gestão de base de dados que:
- Armazena todos os seus dados (funcionários, departamentos, etc.)
- Executa as suas queries SQL
- Garante a integridade dos dados

### Como funciona tudo junto?

```
┌─────────────┐      HTTP      ┌─────────────┐     SQL     ┌──────────────┐
│   Frontend  │ ────────────> │   Backend   │ ─────────> │  PostgreSQL  │
│  (Browser)  │ <──────────── │   (API)     │ <───────── │  (Database)  │
└─────────────┘   Respostas    └─────────────┘  Resultados └──────────────┘
  localhost:5173               localhost:5000              appserver...
```

1. Você clica num botão no **Frontend**
2. Frontend envia um pedido HTTP para o **Backend**
3. Backend faz uma query SQL ao **PostgreSQL**
4. PostgreSQL retorna os dados ao **Backend**
5. Backend processa e envia os dados ao **Frontend**
6. Frontend mostra os dados na tela

---

## ✅ Checklist Final

Antes de considerar tudo configurado, verifique:

- [ ] VPN conectada (se necessário)
- [ ] Dependências instaladas (backend e frontend)
- [ ] Base de dados carregada (`npm run db:setup` executado com sucesso)
- [ ] Backend a correr (`npm run dev` no backend)
- [ ] Frontend a correr (`npm run dev` no frontend)
- [ ] Aplicação abre no navegador (http://localhost:5173)
- [ ] Consegue ver dados (funcionários, departamentos, etc.)

---

**🎉 Parabéns! Está tudo configurado e a funcionar!**

Boa sorte com o seu projeto de Bases de Dados! 🚀
