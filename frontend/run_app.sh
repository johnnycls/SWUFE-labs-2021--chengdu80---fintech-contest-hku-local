#/bin/bash

monitor=`ps -ef | grep node | wc -l ` 
if [ $monitor -eq 1 ] 
then
    npm start > log.txt 2>&1 &
else
    echo "Flask service is running"
fi
