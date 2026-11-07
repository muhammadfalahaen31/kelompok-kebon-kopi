@echo off
title KK-DMS - Publikasi Otomatis ke GitHub
color 0B
cls
echo =======================================================================
echo    KK-DMS (KELOMPOK KEBON KOPI DIGITAL MANAGEMENT SYSTEM)
echo    PUBLIKASI OTOMATIS KE GITHUB (TERIMA JADI)
echo =======================================================================
echo.
echo Langkah 1: Menghubungkan ke Akun GitHub Anda...
echo.
echo * Kode verifikasi akan otomatis disalin ke clipboard Anda.
echo * Browser akan otomatis terbuka ke halaman aktivasi GitHub.
echo * Di browser, cukup tekan Ctrl+V (Paste) lalu klik "Continue" dan "Authorize".
echo.
pause

"C:\Program Files\GitHub CLI\gh.exe" auth login -h github.com -p https -w -c -s repo,workflow

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [PERINGATAN] Otorisasi GitHub belum selesai atau dibatalkan.
    echo Silakan jalankan kembali file ini jika ingin mencoba lagi.
    pause
    exit /b
)

echo.
echo =======================================================================
echo Langkah 2: Mengunggah Kode dan Mengaktifkan Website di GitHub...
echo =======================================================================
echo.
cd /d "%~dp0"
set "PATH=%~dp0.tools\git\cmd;%PATH%"

"C:\Program Files\GitHub CLI\gh.exe" repo create kelompok-kebon-kopi --public --source=. --remote=origin --push 2>nul
if %ERRORLEVEL% NEQ 0 (
    git push -u origin main
)

echo Mengaktifkan GitHub Pages otomatis...
"C:\Program Files\GitHub CLI\gh.exe" api -X POST repos/{owner}/{repo}/pages -f build_type=workflow 2>nul

echo.
echo =======================================================================
echo   SELAMAT! PROYEK BERHASIL DILUNCURKAN KE GITHUB!
echo =======================================================================
echo.
echo Repository GitHub Anda:
echo   -> https://github.com/muhammadfalahaen31/kelompok-kebon-kopi
echo.
echo Link Website Publik Anda (GitHub Pages):
echo   -> https://muhammadfalahaen31.github.io/kelompok-kebon-kopi/
echo.
echo Membuka repository di browser Anda sekarang...
start https://github.com/muhammadfalahaen31/kelompok-kebon-kopi
echo.
pause
