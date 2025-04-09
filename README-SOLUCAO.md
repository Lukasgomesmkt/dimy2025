# Solução para o Erro de Política de Execução

Existem várias maneiras de resolver o erro de política de execução do PowerShell. Escolha a opção que funcionar melhor para você:

## Opção 1: Usar o arquivo install-and-run.cmd

1. Clique duas vezes no arquivo `install-and-run.cmd`
2. Este arquivo executa o PowerShell com o parâmetro `-ExecutionPolicy Bypass`
3. Ele vai instalar as dependências e iniciar o servidor automaticamente

## Opção 2: Criar e usar um atalho

1. Clique duas vezes no arquivo `create-shortcut.bat`
2. Isso vai criar um atalho chamado `run-with-bypass.lnk`
3. Execute o atalho `run-with-bypass.lnk` para instalar e iniciar o projeto

## Opção 3: Usar o Node.js Command Prompt

1. Abra o menu Iniciar e procure por "Node.js Command Prompt"
2. Navegue até a pasta do projeto:
   ```
   cd "D:\Lukas Gomes\Área de Trabalho\DIMY 01\barbershop-app"
   ```
3. Execute os comandos:
   ```
   npm install
   npm run dev
   ```

## Opção 4: Usar o Visual Studio Code

1. Instale o Visual Studio Code se ainda não tiver
2. Abra o VS Code
3. Vá para File > Open Folder e selecione a pasta `barbershop-app`
4. Abra o terminal integrado (View > Terminal ou Ctrl+`)
5. Execute os comandos:
   ```
   npm install
   npm run dev
   ```

## Depois de iniciar o servidor

Depois que o servidor estiver rodando, você pode acessar o aplicativo em http://localhost:3000 no seu navegador.

### Páginas Principais

- **Página de Login**: http://localhost:3000/auth/login
- **Dashboard Principal**: http://localhost:3000/dashboard
- **Agendamentos**: http://localhost:3000/dashboard/appointments
- **Pedidos**: http://localhost:3000/dashboard/orders
- **Produtos**: http://localhost:3000/dashboard/products
- **Cursos**: http://localhost:3000/dashboard/courses
