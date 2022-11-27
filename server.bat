@echo OFF
@REM Порты
SET CWU_PORT_PRELOADER=3332
SET CWU_PORT=3333

@rem Предзагрузчик
cd ./Spinner
start /b npm start

cd ..
@rem Непосредственно сервер
start /b npm start

start http://localhost:%CWU_PORT_PRELOADER%