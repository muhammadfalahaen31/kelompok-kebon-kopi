@echo off
set "PATH=%~dp0.tools\nodejs;%PATH%"
echo ========================================================
echo   KELOMPOK KEBON KOPI - FIREBASE LOGIN
echo ========================================================
echo.
echo Membuka browser untuk menghubungkan akun Firebase Anda...
echo Silakan klik "Izinkan" / "Allow" pada jendela browser yang terbuka.
echo.
call npx --yes firebase-tools login
echo.
echo ========================================================
echo   Menampilkan daftar Project Firebase Anda:
echo ========================================================
call npx --yes firebase-tools projects:list
echo.
pause
