#!/usr/bin/env python
from time import  sleep

from flask import Flask, json, request, Response
from flask_cors import CORS
from flask_sse import sse

api = Flask(__name__)
api.debug = True
api.config["REDIS_URL"] = "redis://localhost"
api.register_blueprint(sse, url_prefix='/stream')
CORS(api)
list_of_events = []




@api.route('/name', methods=['POST'])
def send_name():
    sse.publish(request.form, type='name')
    return "Message sent!"

@api.route('/vote', methods=['POST'])
def send_vote():
    sse.publish(request.form, type='vote')
    return "Message sent!"

@api.route('/reset', methods=['POST'])
def send_reset():
    sse.publish(request.form, type='reset')
    return "Message sent!"

#
# def get_event():
#     sleep(1.0)
#     events_to_return = []
#     while list_of_events:
#         print(list_of_events)
#         events_to_return.append(list_of_events.pop())
#     return events_to_return
#
# @api.route('/stream', methods=['GET'])
# def get_events():
#
#     def event_stream():
#         while True:
#             # wait for source data to be available, then push it
#             yield json.dumps(get_event())
#
#     return Response(event_stream(), mimetype="text/event-stream")
#
# @api.route('/events', methods=['POST'])
# def add_event():
#     list_of_events.append(request.form)
#     return "200"

if __name__ == '__main__':
    api.run()