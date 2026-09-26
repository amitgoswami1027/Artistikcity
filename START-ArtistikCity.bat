@echo off
REM ============================================================
REM  ArtistikCity - one-click start (no database install needed)
REM  Downloads Java 17 + Maven if missing, builds, starts the app
REM  on an in-memory SQL Server-compatible database and opens
REM  http://localhost:8080 in your browser.
REM
REM  Extra options can be passed through, e.g.
REM    START-ArtistikCity.bat -Port 9090
REM ============================================================
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup-and-run.ps1" %*
echo.
pause
