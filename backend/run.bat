@echo off
cd %~dp0
call ..\venv\Scripts\activate
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
