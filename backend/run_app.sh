#/bin/bash

monitor=`ps -ef | grep gunicorn | wc -l ` 
if [ $monitor -eq 1 ] 
then
    #gunicorn -w 3 -b 10.0.6.87:5000 "flaskr:create_app()" > log.txt 2>&1 &
    pip install -e .
    pip3 install -U flask-cors
    pip3 install -U scikit-learn scipy matplotlib
    sudo apt install gunicorn3
    export FLASK_APP="flaskr:create_app()"
    export FLASK_ENV=development
    flask init-db
    gunicorn3 -w 3 -b 10.0.6.87:5000 "flaskr:create_app()" > log.txt 2>&1 &
else
    echo "Flask service is running"
fi
