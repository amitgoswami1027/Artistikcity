@echo off
REM ============================================================
REM  ArtistikCity - start against a real Microsoft SQL Server
REM
REM  Default: SQL Server on localhost:1433 with Windows login.
REM  Other examples (run from a command prompt in this folder):
REM    START-with-SQLServer.bat -SqlUser sa -SqlPassword "YourPass"
REM    START-with-SQLServer.bat -SqlInstance SQLEXPRESS -Trusted
REM    START-with-SQLServer.bat -ResetDatabase     (recreate tables + demo data)
REM ============================================================
cd /d "%~dp0"
set ARGS=%*
if "%ARGS%"=="" set ARGS=-Trusted
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup-and-run.ps1" -Db sqlserver %ARGS%
echo.
pause
