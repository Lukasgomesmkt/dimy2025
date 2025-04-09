# Este script deve ser executado com o parâmetro -ExecutionPolicy Bypass
Write-Host "Instalando dependências do projeto..." -ForegroundColor Yellow
cd ".\barbershop-app"
npm install

Write-Host "Iniciando o servidor de desenvolvimento..." -ForegroundColor Green
npm run dev

# Manter a janela aberta
Read-Host -Prompt "Pressione Enter para sair"
