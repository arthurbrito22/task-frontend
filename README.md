# 📋 TaskFrontend - Interface Angular para Gerenciamento de Tarefas

Aplicação **Single Page Application (SPA)** moderna desenvolvida com **Angular 17+**, focada no gerenciamento reativo de tarefas em integração com uma API RESTful em **Spring Boot** e **PostgreSQL**.

O projeto utiliza os recursos mais recentes do ecossistema Angular, incluindo **Standalone Components**, **Injeção de Dependências com `inject()`**, reatividade com **Signals** e layout CSS responsivo com alinhamento fixo de colunas e botões.

---

## 🚀 Funcionalidades da Interface

- **📋 Listagem Geral de Tarefas:** Consumo do endpoint `GET /tasks` para exibição de todas as tarefas cadastradas.
- **➕ Cadastro de Tarefas:** Formulário reativo com formulários direcionados por modelo (`FormsModule` / `ngModel`) enviando requisições `POST /tasks`.
- **✅ Alternância de Status (Concluir / Reabrir):** Atualização do estado booleano (`completa`) via `PUT /tasks/{id}` com atualização reativa do Signal local.
- **🗑️ Exclusão de Tarefas:** Remoção de itens do banco de dados via `DELETE /tasks/{id}`.
- **🔍 Busca Reativa por ID:** Consulta individual via `GET /tasks/{id}` com tratamento de erros (404) e gerenciamento de estado instantâneo por **Signals** .

---

## 🛠️ Tecnologias e Conceitos Aplicados

- **Framework:** Angular 17+
- **Arquitetura:** Componentes Standalone (`standalone: true`)
- **Gerenciamento de Estado:** Signals (`signal<Task[]>`, `signal<Task | null>`, `signal<string>`)
- **Injeção de Dependência:** Função `inject(TaskService)`
- **Comunicação HTTP:** `HttpClient` e `Observable` (RxJS)
- **Formulários:** `FormsModule` com Two-Way Data Binding (`[(ngModel)]`)
- **Estilização:** CSS3 nativo com layout flexbox em 3 colunas e padronização rígida de componentes

---

## 🏗️ Estrutura do Layout e CSS

A interface foi desenhada para manter um padrão visual estável e previsível, mesmo com variações no tamanho do texto das tarefas:

1. **Coluna 1 (Informações):** Ocupa o espaço flexível principal, exibindo o título e a descrição da tarefa com quebra de linha automática.
2. **Coluna 2 (Status Fixado):** Posição fixa (`.status-container`) centralizada para a badge de estado (`Pendente` / `Concluída`).
3. **Coluna 3 (Grupo de Ações):** Botões padronizados (`.btn-danger`, `.btn-complete`, `.btn-reopen`) com dimensões fixas (`105px x 36px`) e `flex-shrink: 0`, impedindo deformações ou desalinhamentos.

---

## 📌 Configuração e Execução Local

### Pré-requisitos

- **Node.js** (versão 18.x ou superior)
- **Angular CLI** instalado globalmente:
  ```bash
  npm install -g @angular/cli
  ```

### 1. Instalar as Dependências

Na pasta do projeto frontend (`TaskFrontend`), execute:
```bash
npm install
```

### 2. Executar o Servidor de Desenvolvimento

Inicie a aplicação Angular:
```bash
ng serve
```
Navegue para `http://localhost:4200/` no seu navegador. A página será recarregada automaticamente a cada alteração salva no código.

### 3. Integração com o Backend Spring Boot

Certifique-se de que a API Spring Boot está rodando na porta `8080` (`http://localhost:8080/tasks`) antes de realizar as operações na interface.

---

## 📦 Compilação para Produção

Para gerar a versão otimizada de produção na pasta `dist/`:
```bash
ng build
```

---

## 📄 Licença

Projeto desenvolvido para fins de aprendizado e consolidação da stack Fullstack Java + Angular.
