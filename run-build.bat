@echo off
set "PATH=%~dp0.tools\nodejs;%PATH%"
echo Checking TypeScript types...
node "%~dp0node_modules\typescript\lib\tsc.js"
if %ERRORLEVEL% NEQ 0 (
    echo TypeScript error occurred.
    exit /b %ERRORLEVEL%
)
echo Building production assets with Vite...
node "%~dp0node_modules\vite\bin\vite.js" build
echo Build completed successfully!
