@echo off
chcp 65001 >nul
title YAKUP KULAK - Site
cd /d "%~dp0"

rem Node yoksa PATH'e ekle (winget kurulumu buraya kurar)
set "PATH=%PATH%;C:\Program Files\nodejs"

echo.
echo   ============================================
echo     YAKUP KULAK - Sogutma Sitesi baslatiliyor
echo   ============================================
echo.
echo   Tarayici birkac saniye icinde otomatik acilacak.
echo   Site:  http://localhost:3000
echo   Panel: http://localhost:3000/admin
echo.
echo   Kapatmak icin bu pencereyi kapatabilir
echo   veya Ctrl + C tuslayabilirsin.
echo.

rem Sunucu hazir olsun diye kisa bekleyip tarayiciyi ac
start "" /min cmd /c "ping -n 6 127.0.0.1 >nul & start http://localhost:3000"

call npm run dev

pause
