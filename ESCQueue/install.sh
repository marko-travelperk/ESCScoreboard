#!/bin/sh
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py

python get-pip.py


pip install -r requirements.txt
redis-server
python server.py