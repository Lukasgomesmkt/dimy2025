# Habilitar a execução de scripts PowerShell
Write-Host "Habilitando a execução de scripts PowerShell para o usuário atual..." -ForegroundColor Yellow
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
Write-Host "Política de execução alterada com sucesso!" -ForegroundColor Green

# Navegar para a pasta do projeto
cd ".\barbershop-app"

# Instalar dependências
Write-Host "Instalando dependências do projeto..." -ForegroundColor Yellow
npm install

# Iniciar o servidor de desenvolvimento
Write-Host "Iniciando o servidor de desenvolvimento..." -ForegroundColor Green
npm run dev

# Manter a janela aberta
Read-Host -Prompt "Pressione Enter para sair"
