@echo off
REM ============================================================
REM  ArtistikCity - start SQL Server 2022 in Docker Desktop
REM  (container "artistikcity-sql", SA password Artistik#2026Pass)
REM  and run the app against it. Requires Docker Desktop running.
REM ============================================================
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup-and-run.ps1" -Db docker %*
echo.
pause
