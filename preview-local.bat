@echo off
echo ========================================================
echo   KK-DMS: Preview Website Kelompok Kebon Kopi
echo ========================================================
echo Menjalankan server lokal Vite...
cd /d "%~dp0"
set PATH=%~dp0.tools\nodejs;%PATH%
node node_modules\vite\bin\vite.js preview --port 4173 --open
pause
