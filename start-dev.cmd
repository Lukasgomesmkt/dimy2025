@echo off
echo ===================================================
echo  INICIANDO SERVIDOR DE DESENVOLVIMENTO
echo ===================================================
echo.

echo Limpando cache do Next.js...
rmdir /s /q .next 2>nul

echo Iniciando servidor com opcoes de depuracao...
set NODE_OPTIONS=--inspect
npm run dev -- --turbo
