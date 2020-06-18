from pip._vendor import requests


ENTRIES = [
    "Albania".lower(),
    # "Andorra".lower(),
    "Armenia".lower(),
    # "Australia".lower(),
    # "Austria".lower(),
    "Azerbaijan".lower(),
    # "Belarus".lower(),
    # "Belgium".lower(),
    # "Bosnia and Herzegovina".lower(),
    "Bulgaria".lower(),
    # "Croatia".lower(),
    # "Cyprus".lower(),
    # "Czech Republic".lower(),
    # "Denmark".lower(),
    # "Estonia".lower(),
    "Finland".lower(),
    # "France".lower(),
    "Georgia".lower(),
    # "Germany".lower(),
    "Greece".lower(),
    "Hungary".lower(),
    "Iceland".lower(),
    # "Ireland".lower(),
    "Israel".lower(),
    # "Italy".lower(),
    "Latvia".lower(),
    # "Lithuania".lower(),
    # "Luxembourg".lower(),
    "Macedonia".lower(),
    "Malta".lower(),
    # "Moldova".lower(),
    # "Monaco".lower(),
    # "Montenegro".lower(),
    # "Netherlands".lower(),
    "Norway".lower(),
    # "Poland".lower(),
    # "Portugal".lower(),
    "Romania".lower(),
    # "Russia".lower(),
    "San Marino".lower(),
    # "Serbia".lower(),
    # "Slovenia".lower(),
    # "Spain".lower(),
    # "Sweden".lower(),
    "Switzerland".lower(),
    # "Turkey".lower(),
    # "Ukraine".lower(),
    # "United Kingdom".lower(),
    # "Yugoslavia".lower(),
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
