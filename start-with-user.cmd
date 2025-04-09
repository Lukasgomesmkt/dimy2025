@echo off
echo ===================================================
echo  INICIANDO SERVIDOR COM USUARIO PRE-CADASTRADO
echo ===================================================
echo.

echo Limpando cache do Next.js...
rmdir /s /q .next 2>nul

echo Informacoes do usuario pre-cadastrado:
echo.
echo   Nome: Lucas Gomes
echo   Email: lucas.gomes@example.com
echo   Senha: senha123
echo   Tipo: Cliente
echo.
echo ===================================================
echo.

echo Iniciando servidor...
npm run dev
