@echo off
echo ===================================================
echo  INICIANDO SERVIDOR COM SUPORTE A NOVOS USUARIOS
echo ===================================================
echo.

echo Limpando cache do Next.js...
rmdir /s /q .next 2>nul

echo.
echo ===================================================
echo  INFORMACOES IMPORTANTES
echo ===================================================
echo.
echo 1. Usuarios cadastrados serao salvos no localStorage
echo    e permanecerao disponiveis entre sessoes.
echo.
echo 2. Para fazer logout, clique no botao de sair no
echo    canto superior direito ou na barra lateral.
echo.
echo 3. Apos criar um novo usuario, voce sera redirecionado
echo    para o dashboard e podera ver seus dados.
echo.
echo ===================================================
echo.

echo Iniciando servidor...
npm run dev
