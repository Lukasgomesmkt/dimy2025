@echo off
echo Criando atalho para executar o PowerShell com Bypass...

powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%~dp0run-with-bypass.lnk'); $Shortcut.TargetPath = 'powershell.exe'; $Shortcut.Arguments = '-ExecutionPolicy Bypass -File \"%~dp0install-and-run.ps1\"'; $Shortcut.Save()"

echo Atalho criado com sucesso!
echo Execute o arquivo "run-with-bypass.lnk" para instalar e iniciar o projeto.
pause
