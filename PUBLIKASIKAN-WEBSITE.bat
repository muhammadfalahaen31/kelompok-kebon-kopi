@echo off
title KK-DMS - Publikasi Website Kelompok Kebon Kopi
color 0A
cls
echo =======================================================================
echo    KK-DMS (KELOMPOK KEBON KOPI DIGITAL MANAGEMENT SYSTEM)
echo    PUBLIKASI RESMI KE INTERNET (FIREBASE HOSTING)
echo =======================================================================
echo.
echo Website siap dipublikasikan ke domain resmi:
echo https://project-kebon-kopi.web.app
echo.
cd /d "%~dp0"
set "PATH=%~dp0.tools\nodejs;%PATH%"

echo Memeriksa koneksi dan modul Firebase...
echo (Harap tunggu, proses ini membutuhkan waktu 1-2 menit pada percobaan pertama)...
echo.

call "%~dp0.tools\nodejs\node.exe" "%~dp0.tools\nodejs\node_modules\npm\bin\npx-cli.js" --yes firebase-tools login

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo =======================================================================
    echo [CATATAN] Jendela login Firebase belum selesai atau dibatalkan.
    echo =======================================================================
    echo.
    pause
    exit /b
)

echo.
echo =======================================================================
echo Mengunggah file website ke Firebase Hosting...
echo =======================================================================
echo.
call "%~dp0.tools\nodejs\node.exe" "%~dp0.tools\nodejs\node_modules\npm\bin\npx-cli.js" --yes firebase-tools deploy --only hosting --project project-kebon-kopi

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =======================================================================
    echo   SELAMAT! WEBSITE KELOMPOK KEBON KOPI BERHASIL LIVE DI INTERNET!
    echo =======================================================================
    echo.
    echo URL Resmi Website:
    echo   -^> https://project-kebon-kopi.web.app
    echo   -^> https://project-kebon-kopi.firebaseapp.com
    echo.
    echo Membuka website di browser Anda sekarang...
    start https://project-kebon-kopi.web.app
    echo.
) else (
    echo.
    echo Terjadi kendala saat upload. Pastikan koneksi internet stabil.
)

echo.
pause
