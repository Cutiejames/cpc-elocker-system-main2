@echo off
echo Importing database "capstone"...
cd /d C:\Users\Admin\Desktop\backend
mysql -u jbj_capstone -p capstone < src\database\capstoneDB.sql
echo Done! Database imported from src\database\capstoneDB.sql
pause