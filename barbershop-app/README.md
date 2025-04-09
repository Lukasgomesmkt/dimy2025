# Barbershop App

Um sistema completo para agendamento de barbearia, marketplace de produtos e cursos online.

## Funcionalidades

- Autenticação de usuários (login, cadastro, recuperação de senha)
- Alternância entre temas claro/escuro
- Agendamento de horários
- Marketplace de produtos com integração com os Correios
- Cursos online e vídeo-aulas
- Rastreamento de pedidos
- Cálculo automático de frete

## Como Iniciar

### Pré-requisitos

- Node.js (v14 ou posterior)
- npm ou yarn

### Instalação Fácil (Solução para Erro de Execução de Scripts)

1. Execute o arquivo `run-as-admin.bat` na pasta raiz do projeto
   - Este arquivo vai abrir o PowerShell como administrador
   - Vai habilitar a execução de scripts para o usuário atual
   - Vai instalar as dependências e iniciar o servidor

### Instalação Manual

1. Abra o PowerShell como administrador
2. Execute: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`
3. Navegue até a pasta do projeto: `cd barbershop-app`
4. Instale as dependências: `npm install`
5. Inicie o servidor: `npm run dev`

### Acessando o Sistema

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

#### Páginas Principais

- **Login**: http://localhost:3000/auth/login
- **Dashboard**: http://localhost:3000/dashboard
- **Agendamentos**: http://localhost:3000/dashboard/appointments
- **Pedidos**: http://localhost:3000/dashboard/orders
- **Produtos**: http://localhost:3000/dashboard/products
- **Cursos**: http://localhost:3000/dashboard/courses

## Estrutura do Projeto

- `/src/app` - Páginas usando Next.js App Router
- `/src/components` - Componentes UI reutilizáveis
- `/src/lib` - Funções utilitárias e bibliotecas
  - `/src/lib/correios.ts` - Integração com API dos Correios
  - `/src/lib/products.ts` - Gerenciamento de produtos
  - `/src/lib/orders.ts` - Sistema de pedidos e rastreamento
- `/src/styles` - Estilos globais e módulos CSS

## Autenticação

O aplicativo usa Supabase para autenticação. Para configurar o Supabase:

1. Crie uma conta e projeto no Supabase
2. Adicione sua URL do Supabase e chave anônima às variáveis de ambiente
3. Configure os provedores de autenticação no painel do Supabase

## Integração com Correios

O sistema inclui integração com a API dos Correios para:

1. Cálculo automático de frete baseado no CEP, peso e dimensões
2. Geração de etiquetas de envio
3. Rastreamento de encomendas em tempo real

Para usar a integração real com os Correios, você precisará substituir as funções simuladas em `src/lib/correios.ts` por chamadas reais à API dos Correios.

## Database Schema (Planned)

- Users
  - id
  - email
  - name
  - role (customer, barber, admin)
  - created_at

- Appointments
  - id
  - user_id
  - barber_id
  - service_id
  - date
  - time
  - status
  - created_at

- Products
  - id
  - name
  - description
  - price
  - image_url
  - stock
  - created_at

- Courses
  - id
  - title
  - description
  - price
  - thumbnail_url
  - created_at

- Lessons
  - id
  - course_id
  - title
  - description
  - video_url
  - duration
  - order
  - created_at
