@rem Предзагрузчик
cd ./Spinner
start /b npm start

cd ..
@rem Непосредственно сервер
start /b npm start



start http://localhost:3332
