@echo off
echo ========================================================
echo   KK-DMS: Push dan Deploy ke GitHub
echo ========================================================
cd /d "%~dp0"
set PATH=%~dp0.tools\git\cmd;%PATH%
"C:\Program Files\GitHub CLI\gh.exe" repo create kelompok-kebon-kopi --public --source=. --remote=origin --push
echo.
echo Selesai! Kode berhasil diupload ke GitHub:
echo https://github.com/muhammadfalahaen31/kelompok-kebon-kopi
pause
