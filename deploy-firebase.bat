@echo off
set "PATH=%~dp0.tools\nodejs;%PATH%"
echo ========================================================
echo   KELOMPOK KEBON KOPI - DEPLOYMENT FIREBASE HOSTING
echo ========================================================
echo.
echo Melakukan build aplikasi produksi...
call "%~dp0run-build.bat"
if %ERRORLEVEL% NEQ 0 (
    echo Gagal melakukan build.
    pause
    exit /b %ERRORLEVEL%
)
echo.
echo Memulai deployment ke Firebase Hosting (project-kebon-kopi)...
call npx --yes firebase-tools deploy --only hosting --project project-kebon-kopi
echo.
pause
