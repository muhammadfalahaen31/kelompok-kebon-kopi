@echo off
title KK-DMS - Upload Kode ke GitHub
color 0E
cls
echo =======================================================================
echo    KK-DMS (KELOMPOK KEBON KOPI DIGITAL MANAGEMENT SYSTEM)
echo    UPLOAD SOURCE CODE KE REPOSITORY GITHUB
echo =======================================================================
echo.
cd /d "%~dp0"
set "PATH=%~dp0.tools\git\cmd;%PATH%"

echo Menyiapkan remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/muhammadfalahaen31/kelompok-kebon-kopi.git
git branch -M main

echo.
echo Melakukan push ke GitHub...
echo (Jika muncul jendela popup GitHub di browser, cukup klik Sign In / Izinkan)
echo.
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =======================================================================
    echo   BERHASIL! SOURCE CODE SUDAH TERUPLOAD KE GITHUB:
    echo   https://github.com/muhammadfalahaen31/kelompok-kebon-kopi
    echo =======================================================================
    echo.
    start https://github.com/muhammadfalahaen31/kelompok-kebon-kopi
) else (
    echo.
    echo [CATATAN] Pastikan Anda sudah membuat repository bernama:
    echo          kelompok-kebon-kopi
    echo di https://github.com/new
)
echo.
pause
