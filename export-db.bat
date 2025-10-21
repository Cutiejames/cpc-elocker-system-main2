@echo off
echo Exporting database "capstone"...
cd /d C:\Users\Admin\Desktop\backend
mysqldump -u jbj_capstone -p capstone > src\database\capstoneDB.sql
echo Done! File saved at src\database\capstoneDB.sql
pause