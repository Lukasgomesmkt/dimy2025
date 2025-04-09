# Como Executar o Barbershop App

Este documento contém instruções detalhadas para executar o aplicativo Barbershop App.

## Opções de Instalação

Temos várias opções para instalar e executar o aplicativo. Escolha a que funcionar melhor para você:

### Opção 1: Instalação Padrão (Recomendada)

1. Clique duas vezes no arquivo `install-and-run.cmd`
2. Este script vai:
   - Limpar o cache do npm
   - Remover node_modules e package-lock.json (se existirem)
   - Instalar as dependências com npm
   - Iniciar o servidor de desenvolvimento

### Opção 2: Instalação Direta com NPM

Se a Opção 1 não funcionar, tente:

1. Clique duas vezes no arquivo `install-npm-direct.cmd`
2. Este script usa npm diretamente, sem passar pelo PowerShell

### Opção 3: Instalação com Yarn

Se as opções anteriores não funcionarem, tente:

1. Clique duas vezes no arquivo `install-with-yarn.cmd`
2. Este script instala o yarn globalmente e usa yarn para instalar as dependências

## Páginas Principais

Depois que o servidor estiver rodando, você pode acessar o aplicativo em http://localhost:3000 no seu navegador.

- **Página de Login**: http://localhost:3000/auth/login
- **Dashboard Principal**: http://localhost:3000/dashboard
- **Agendamentos**: http://localhost:3000/dashboard/appointments
- **Pedidos**: http://localhost:3000/dashboard/orders
- **Detalhes do Pedido**: http://localhost:3000/dashboard/orders/ORD-2025-0001
- **Produtos**: http://localhost:3000/dashboard/products
- **Detalhes do Produto**: http://localhost:3000/dashboard/products/1
- **Cursos**: http://localhost:3000/dashboard/courses

## Solução de Problemas

Se você encontrar problemas durante a instalação ou execução:

1. **Erro "Invalid Version"**: Este erro foi corrigido especificando versões exatas no arquivo package.json.

2. **Erro de Política de Execução do PowerShell**: Os scripts foram projetados para contornar este problema usando o parâmetro `-ExecutionPolicy Bypass`.

3. **Erro de Dependências**: Tente usar a opção de instalação com yarn, que geralmente é mais tolerante a problemas de dependências.

4. **Outros Erros**: Se você encontrar outros erros, tente:
   - Verificar se o Node.js está instalado corretamente
   - Atualizar o Node.js para a versão mais recente
   - Limpar o cache do npm: `npm cache clean --force`
   - Remover a pasta node_modules e o arquivo package-lock.json manualmente
