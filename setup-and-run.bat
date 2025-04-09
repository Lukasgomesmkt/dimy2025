@echo off
echo Instalando dependencias e iniciando o servidor...
cd barbershop-app
call npm install
call npm run dev
pause
