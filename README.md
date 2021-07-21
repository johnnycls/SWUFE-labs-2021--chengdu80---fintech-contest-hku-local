# 2021--chengdu80---fintech-contest-hku

## Prerequisite

- [install python](https://python.org)
- [install nodejs](https://nodejs.org/en/)

## Usage

- `cd backend`
- `pip install -e ../..`
- `pip install -e .`
- `pip3 install -U flask-cors`
- `pip3 install -U scikit-learn scipy matplotlib`
- `sudo apt install gunicorn`
- `pip3 install eventlet`
- `pip3 install gevent`
- `export FLASK_APP="flaskr:create_app()"`
- `export FLASK_ENV=development`
- `flask init-db`
- `gunicorn -w 3 -b 10.0.6.87:5000 "flaskr:create_app()" > log.txt 2>&1 &`
- Open another terminal
- `cd frontend`
- `npm i`
- `npm start`

## Documentation
Refer to [here](https://fintechendeavour.gitbook.io/aspect/) for more details!
