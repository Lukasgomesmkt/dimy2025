@echo off
echo ===================================================
echo  INSTALACAO COM YARN
echo ===================================================
echo.
echo Este script vai:
echo 1. Navegar para a pasta do projeto
echo 2. Instalar o yarn globalmente (se necessario)
echo 3. Instalar as dependencias com yarn
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

echo Removendo node_modules (se existir)...
if exist "node_modules" (
    rmdir /s /q node_modules
)

echo Removendo package-lock.json (se existir)...
if exist "package-lock.json" (
    del package-lock.json
)

echo Removendo yarn.lock (se existir)...
if exist "yarn.lock" (
    del yarn.lock
)

echo.
echo ===================================================
echo  INSTALANDO YARN GLOBALMENTE...
echo ===================================================
echo.

call npm install -g yarn

echo.
echo ===================================================
echo  INSTALANDO DEPENDENCIAS COM YARN...
echo ===================================================
echo.

call yarn install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERRO: Falha ao instalar dependencias com yarn.
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

call yarn dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERRO: Falha ao iniciar o servidor.
    echo.
    echo Pressione qualquer tecla para sair...
    pause > nul
    exit /b 1
)

pause
