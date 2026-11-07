@echo off
title KK-DMS - Menjalankan Website Secara Lokal
color 0B
cls
echo =======================================================================
echo    KK-DMS (KELOMPOK KEBON KOPI DIGITAL MANAGEMENT SYSTEM)
echo    SERVER LOKAL PREVIEW (SIAP PAKAI)
echo =======================================================================
echo.
echo Menjalankan website di komputer Anda...
echo Browser akan otomatis terbuka ke: http://localhost:4173
echo.
cd /d "%~dp0"
set "PATH=%~dp0.tools\nodejs;%PATH%"
node node_modules\vite\bin\vite.js preview --port 4173 --open
pause
