# Sprint 3 - Sistema de Coletas e Entregas

## 📱 Sobre o Projeto

Sistema completo de gerenciamento de coletas e entregas desenvolvido com **React Native/Expo** e **Spring Boot**, evoluindo o MVP da Sprint 2 com integração de dados via API real e melhorias significativas na experiência do usuário.

### 🎯 Objetivos Alcançados

**Sprint 3 - Integração de Dados e UX:**
- ✅ Substituição completa de mocks estáticos por API simulada
- ✅ Melhorias de UX e feedback ao usuário
- ✅ Consumo de dados via Axios
- ✅ Telas atualizadas dinamicamente
- ✅ Feedback visual completo (loading, toast, snackbar)

**Sprint 3 - Validações e Segurança:**
- ✅ Validações robustas em entidades
- ✅ DTOs para separação de camadas
- ✅ Autenticação JWT funcional
- ✅ Tratamento centralizado de erros
- ✅ Boas práticas de desenvolvimento

## 🚀 Tecnologias Utilizadas

### Frontend (React Native/Expo)
- **React Native** com Expo
- **React Navigation** para navegação estável
- **Context API** para gerenciamento de estado
- **Axios** para consumo de API
- **React Native Paper** para componentes UI
- **React Native Toast Message** para feedback

### Backend (Spring Boot)
- **Spring Boot 3.5.0**
- **Spring Security** com JWT
- **Spring Data JPA** para persistência
- **H2 Database** (modo arquivo)
- **Bean Validation** para validações
- **DTOs** para separação de camadas
- **GlobalExceptionHandler** para tratamento de erros

## 📋 Funcionalidades Implementadas

### ✅ Autenticação e Segurança
- Login com JWT funcional
- Proteção de endpoints com validação de token
- Persistência de sessão no AsyncStorage
- Tratamento centralizado de erros

### ✅ Gerenciamento de Coletas
- Listagem dinâmica de coletas via API
- Detalhes completos com histórico
- Atualização de status em tempo real
- Validações robustas nos dados

### ✅ Gerenciamento de Entregas
- Listagem dinâmica de entregas via API
- Detalhes completos com histórico
- Atualização de status em tempo real
- Validações robustas nos dados

### ✅ Experiência do Usuário
- Navegação estável sem erros
- Pull-to-refresh com ActivityIndicator
- Toast messages para feedback
- Loading indicators em todas as operações
- Design responsivo e moderno

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- Java 17
- Maven
- Expo CLI (`npm install -g @expo/cli`)

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd sprint2
```

### 2. Instalação das dependências

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
mvn clean install
cd ..
```

### 3. Execução

**⚠️ IMPORTANTE: Execute o backend PRIMEIRO, depois o frontend!**

**Passo 1: Executar o Backend (OBRIGATÓRIO)**
```bash
cd backend
mvn spring-boot:run
```
*Aguarde o Spring Boot inicializar completamente (aparecerá "Started BackendApplication")*

**Passo 2: Executar o Frontend**
```bash
# Em outro terminal, na raiz do projeto
npm start
# ou
npx expo start
```

**Opção Alternativa: Executar tudo junto**
```bash
npm run dev
```
*Este comando executa backend e frontend simultaneamente*

### 4. Acessar a aplicação

- **App Mobile**: Use o Expo Go no seu celular ou emulador
- **Backend API**: http://localhost:8081
- **H2 Console**: http://localhost:8081/h2-console
  - JDBC URL: `jdbc:h2:file:./data/app_database`
  - Username: `sa`
  - Password: (deixe vazio)

## 🔐 Credenciais de Acesso

### Usuário Padrão
- **Email**: admin@admin.com
- **Senha**: admin

## 📱 Telas do Aplicativo

### 1. Tela de Login
- Autenticação com email e senha
- Validação de campos em tempo real
- Feedback visual com Toast
- Loading indicator durante login

### 2. Tela Principal (Home)
- Listagem dinâmica de coletas pendentes
- Listagem dinâmica de entregas pendentes
- Pull-to-refresh com ActivityIndicator
- Navegação estável por abas
- Cards informativos com status colorido

### 3. Tela de Detalhes
- Informações completas da coleta/entrega
- Lista de itens com peso e fragilidade
- Botões de ação (Iniciar/Concluir) com loading
- Atualização de status em tempo real
- Feedback visual para todas as ações

### 4. Dashboard
- Visão consolidada de todas as tarefas
- Estatísticas em tempo real
- Filtros por status
- Atualização dinâmica dos dados

### 5. Outras Telas
- **Mapa**: Visualização geográfica
- **Perfil**: Informações do usuário
- **Mais**: Configurações adicionais

## 🔧 Configuração do Banco de Dados

O projeto utiliza H2 Database em modo arquivo, o que significa que os dados são persistidos entre reinicializações do servidor.

### Estrutura das Tabelas
- **users**: Usuários do sistema
- **collects**: Coletas
- **collect_items**: Itens das coletas
- **deliveries**: Entregas
- **delivery_items**: Itens das entregas

## 📡 Endpoints da API

### Autenticação
- `POST /auth/login` - Login do usuário

### Coletas
- `GET /api/collects` - Listar todas as coletas
- `GET /api/collects/{id}` - Obter coleta por ID
- `POST /api/collects` - Criar nova coleta
- `PATCH /api/collects/{id}/status` - Atualizar status da coleta
- `DELETE /api/collects/{id}` - Excluir coleta

### Entregas
- `GET /api/deliveries` - Listar todas as entregas
- `GET /api/deliveries/{id}` - Obter entrega por ID
- `POST /api/deliveries` - Criar nova entrega
- `PATCH /api/deliveries/{id}/status` - Atualizar status da entrega
- `DELETE /api/deliveries/{id}` - Excluir entrega

## 🧪 Testando a API

### Exemplo de Login
```bash
curl -X POST http://localhost:8081/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@admin.com", "senha": "admin"}'
```

**Resposta esperada:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer"
}
```

### Exemplo de Listagem de Coletas (com autenticação)
```bash
curl -X GET http://localhost:8081/api/collects \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

### Exemplo de Atualização de Status
```bash
curl -X PATCH http://localhost:8081/api/collects/1/status \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Content-Type: application/json" \
  -d '{"status": "IN_PROGRESS"}'
```

## 📊 Dados de Exemplo

O sistema é inicializado automaticamente com dados de exemplo:
- **2 coletas** (1 pendente, 1 em andamento)
- **2 entregas** (1 pendente, 1 em andamento)
- **1 usuário administrador** (admin@admin.com / admin)
- **Itens associados** para cada coleta/entrega

## 🐛 Solução de Problemas

### Erro de Conexão com Backend
- Verifique se o Spring Boot está rodando na porta 8081
- Confirme se não há conflito de portas
- Execute `mvn spring-boot:run` no diretório backend

### Erro de Autenticação
- Verifique se o usuário existe no banco
- Confirme se a senha está correta
- Use as credenciais padrão: admin@admin.com / admin

### Erro de CORS
- O backend já está configurado para aceitar requisições do frontend
- Verifique se as URLs estão corretas
- Confirme se o backend está rodando antes do frontend

### Erro de Compilação
- Execute `mvn clean install` no diretório backend
- Verifique se o Java 17 está instalado
- Confirme se o Maven está configurado corretamente

## ✅ Critérios de Aceitação - Sprint 3

### Integração de Dados e UX
- ✅ **Substituição de dados mockados**: API Spring Boot implementada
- ✅ **Navegação estável**: Sem erros ao mudar de telas
- ✅ **Feedback visual**: Loading, erros, mensagens implementados
- ✅ **Documentação clara**: README completo e detalhado

### Validações e Segurança
- ✅ **DTOs implementados**: Sem exposição direta das entidades
- ✅ **Autenticação JWT**: Login e acesso protegido funcionando
- ✅ **Validações aplicadas**: Bean Validation em todas as entidades
- ✅ **Tratamento de erros**: GlobalExceptionHandler implementado


##  Identificação dos Alunos

**Alunos:**
- Fernando Bertolucci 556978
- Gustavo Paraszczuk 555394
- Jennifer De Souza 558761
- Leonardo Ken Miwa 556889
- Rômulo Xavier 559087

## 📝 Notas de Desenvolvimento

### Boas Práticas Implementadas
- **Validações robustas** com Bean Validation
- **DTOs** para separação de camadas
- **Tratamento centralizado** de erros
- **Autenticação JWT** com proteção de endpoints
- **Interface responsiva** e moderna
- **Feedback visual** em todas as operações
- **Navegação estável** sem erros
- **Consumo de API** com Axios

### Arquitetura
- **Frontend**: React Native/Expo com Context API
- **Backend**: Spring Boot com JPA e H2
- **Segurança**: JWT com Spring Security
- **Validação**: Bean Validation com DTOs
- **Persistência**: H2 Database em modo arquivo