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
echo Langkah 1: Memeriksa dan Menghubungkan Akun Google / Firebase Anda...
echo (Jendela browser akan terbuka, cukup klik akun Google Anda dan klik Izinkan)
echo.
cd /d "%~dp0"
set "PATH=%~dp0.tools\nodejs;%PATH%"

call npx --yes firebase-tools login
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [PERINGATAN] Login Firebase dibatalkan atau belum selesai.
    echo Silakan coba jalankan file ini kembali.
    pause
    exit /b
)

echo.
echo =======================================================================
echo Langkah 2: Mengunggah Website ke Firebase Hosting...
echo =======================================================================
echo.
call npx --yes firebase-tools deploy --only hosting --project project-kebon-kopi

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
