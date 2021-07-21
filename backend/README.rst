Flaskr
======
Create a virtualenv and activate it::

    $ python3 -m venv venv
    $ . venv/bin/activate

Or on Windows cmd::

    $ py -3 -m venv venv
    $ venv\Scripts\activate.bat

Install Flaskr::

    $ pip install -e .

Or if you are using the main branch, install Flask from source before
installing Flaskr::

    $ pip install -e ../..
    $ pip install -e .

Installing flask-cors::
    $ pip3 install -U flask-cors

Installing scikit-learn::
    $ pip3 install -U scikit-learn scipy matplotlib
Run
---

::

    $ export FLASK_APP=flaskr
    $ export FLASK_ENV=development
    $ flask init-db
    $ flask run

Open http://127.0.0.1:5000 in a browser.

