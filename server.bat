@rem Непосредственно сервер
start /b npm start

@rem Предзагрузчик
cd ./Spinner
start /b npm start

start http://localhost:3332
