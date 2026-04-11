@echo off
echo Starting all Next.js applications...
echo.

start "Gateway" cmd /k "cd gateway && npm run dev"
timeout /t 2 /nobreak > nul

start "Teacher Dashboard" cmd /k "cd teacher-dashboard && npm run dev"
timeout /t 2 /nobreak > nul

start "Student Dashboard" cmd /k "cd student-dashboard && npm run dev"
timeout /t 2 /nobreak > nul

start "Onboarding" cmd /k "cd onboarding && npm run dev"

echo.
echo All applications started!
echo.
echo Gateway:    http://localhost:3000
echo Teacher:    http://localhost:3000/teacher
echo Student:    http://localhost:3000/student
echo Onboarding: http://localhost:3000/onboarding
echo.
echo Press any key to exit...
pause > nul
