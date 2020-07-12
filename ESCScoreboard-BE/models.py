from pip._vendor import requests


ENTRIES = [
    "Austria".lower(),
    "Belgium".lower(),
    "Denmark".lower(),
    "Finland".lower(),
    "France".lower(),
    "Germany".lower(),
    "Greece".lower(),
    "Iceland".lower(),
    "Ireland".lower(),
    "Israel".lower(),
    "Italy".lower(),
    "Luxembourg".lower(),
    "Netherlands".lower(),
    "Norway".lower(),
    "Portugal".lower(),
    "Spain".lower(),
    "Sweden".lower(),
    "Switzerland".lower(),
    "Turkey".lower(),
    "United Kingdom".lower(),
    "Yugoslavia".lower(),
]

class State:

    def __init__(self):
        self.current_votes_list = dict()

    def change_name(self, name):
        self.current_voter = name
        requests.post("http://localhost:5000/name", {
            "name": name
        })

    def finish_voting(self, exporter):
        # print(f"{self.current_voter} done! scores {self.current_votes_list}")
        exporter.add_votes(self.current_votes_list, self.current_voter)
        requests.post("http://localhost:5000/reset", {})

    def add_vote(self, country, previous_rank, new_rank):
        self.current_votes_list[country] = new_rank
        requests.post("http://localhost:5000/vote", {
            "country": country,
            "previous_rank": previous_rank,
            "new_rank": new_rank
        })

    def cancel_vote(self):
        requests.post("http://localhost:5000/cancel", {})
history = []


VOTERS = ["Marko", "Ed", "Rinor", "Luke", "Simon", "Matteo", "Costa", "Rodrigo", "Pedro", "Vladan", "Philip", "Oliver", "Thomas", "Nathan", "Wiv", "Hlynur", "Aivis"]
