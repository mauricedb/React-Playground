@IF EXIST node_modules GOTO start-server
	call npm install

:start-server
call gulp
explorer http://localhost:8080
call npm start
