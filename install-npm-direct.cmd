@echo off
echo ===================================================
echo  INSTALACAO DIRETA COM NPM
echo ===================================================
echo.
echo Este script vai:
echo 1. Navegar para a pasta do projeto
echo 2. Limpar o cache do npm
echo 3. Instalar as dependencias diretamente com npm
echo 4. Iniciar o servidor de desenvolvimento
echo.
echo Pressione qualquer tecla para continuar...
pause > nul

cd barbershop-app

echo.
echo ===================================================
echo  LIMPANDO AMBIENTE...
echo ===================================================
echo.

echo Limpando cache do npm...
call npm cache clean --force

echo Removendo node_modules (se existir)...
if exist "node_modules" (
    rmdir /s /q node_modules
)

echo Removendo package-lock.json (se existir)...
if exist "package-lock.json" (
    del package-lock.json
)

echo.
echo ===================================================
echo  INSTALANDO DEPENDENCIAS...
echo ===================================================
echo.

call npm install --legacy-peer-deps --no-fund

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERRO: Falha ao instalar dependencias.
    echo.
    echo Pressione qualquer tecla para sair...
    pause > nul
    exit /b 1
)

echo.
echo ===================================================
echo  DEPENDENCIAS INSTALADAS COM SUCESSO!
echo ===================================================
echo.
echo Iniciando o servidor de desenvolvimento...
echo.
echo O servidor sera iniciado em http://localhost:3000
echo.
echo Paginas principais:
echo - Login: http://localhost:3000/auth/login
echo - Dashboard: http://localhost:3000/dashboard
echo - Agendamentos: http://localhost:3000/dashboard/appointments
echo - Pedidos: http://localhost:3000/dashboard/orders
echo - Produtos: http://localhost:3000/dashboard/products
echo - Cursos: http://localhost:3000/dashboard/courses
echo.
echo Pressione Ctrl+C para encerrar o servidor quando terminar.
echo.
echo Iniciando...
echo.

call npm run dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERRO: Falha ao iniciar o servidor.
    echo.
    echo Pressione qualquer tecla para sair...
    pause > nul
    exit /b 1
)

pause
