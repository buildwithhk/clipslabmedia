@echo off
title ClipsLab Media 2.0 Studio Website
cd /d "%~dp0"

echo ========================================================
echo        ClipsLab Media 2.0 - Futuristic Creative Studio
echo ========================================================
echo.
echo Starting local development server...
echo Your browser will open automatically when ready!
echo.
echo NOTE: KEEP THIS WINDOW OPEN! 
echo If you close this black window, the website will stop.
echo ========================================================
echo.

call npm run dev

pause
