@echo off
set "PATH=%~dp0.tools\nodejs;%PATH%"
echo Starting Kelompok Kebon Kopi (KK-DMS) Dev Server...
node "%~dp0node_modules\vite\bin\vite.js" --host
