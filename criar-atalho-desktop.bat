@echo off
echo Criando atalho para o desktop...

set SCRIPT_PATH=%~dp0install-and-run.cmd
set DESKTOP_PATH=%USERPROFILE%\Desktop
set SHORTCUT_NAME=Barbershop App.lnk

powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%DESKTOP_PATH%\%SHORTCUT_NAME%'); $Shortcut.TargetPath = '%SCRIPT_PATH%'; $Shortcut.IconLocation = 'shell32.dll,21'; $Shortcut.Save()"

echo Atalho criado com sucesso no Desktop!
echo Agora voce pode iniciar o aplicativo diretamente do seu Desktop.
echo.
echo Pressione qualquer tecla para sair...
pause > nul
