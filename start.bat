@IF EXIST node_modules GOTO start-server
	call npm install

:start-server
call gulp
call npm start
