from pip._vendor import requests

ENTRIES = [
    "Czech Republic".lower(),
    "Spain".lower(),
    "Slovenia".lower(),
    "Greece".lower(),
    "Sweden".lower(),
    "Bulgaria".lower(),
    "Israel".lower(),
    "Portugal".lower(),
    "Italy".lower(),
    "Denmark".lower(),
    "Cyprus".lower(),
    "Montenegro".lower(),
    "Hungary".lower(),
    "United Kingdom".lower(),
    "Malta".lower(),
    "Latvia".lower(),
    "Albania".lower(),
    "Estonia".lower(),
    "Germany".lower(),
    "Australia".lower(),
    "Switzerland".lower(),
    "Moldova".lower(),
    "Lithuania".lower(),
    "Ukraine".lower(),
    "France".lower(),
    "Austria".lower(),
    # "Russia".lower(),
    # "Netherlands".lower(),
    # "Georgia".lower(),
    # "Poland".lower(),
    # "Norway".lower(),
    # "Romania".lower(),
    # "Serbia".lower(),
    # "San Marino".lower(),
    # "Bosnia and Herzegovina".lower(),
    # "Andorra".lower(),
    # "Turkey".lower(),
    # "Monaco".lower(),
    # "Azerbaijan".lower(),
    # "Belgium".lower(),
    # "Iceland".lower(),
    # "Belarus".lower(),
    # "Macedonia".lower(),
    # "Croatia".lower(),
    # "Finland".lower(),
    # "Armenia".lower(),
    # "Ireland".lower(),
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

history = []


VOTERS = ["Marko", "Ed", "Rinor", "Luke", "Simon", "Matteo", "Costa", "Rodrigo", "Pedro", "Vladan", "Philip", "Oliver", "Thomas", "Nathan", "Wiv", "Hlynur", "Aivis"]
