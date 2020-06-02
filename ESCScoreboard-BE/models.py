from pip._vendor import requests

ENTRIES = [
    "Azerbaijan".lower(),
    "Iceland".lower(),
    "Albania".lower(),
    "Belgium".lower(),
    "Czech Republic".lower(),
    "Lithuania".lower(),
    "Israel".lower(),
    "Belarus".lower(),
    "Estonia".lower(),
    "Bulgaria".lower(),
    "Macedonia".lower(),
    "Croatia".lower(),
    "Austria".lower(),
    "Greece".lower(),
    "Finland".lower(),
    "Armenia".lower(),
    "Switzerland".lower(),
    "Ireland".lower(),
    "Cyprus".lower(),
    # "Slovenia".lower(),
    # "France".lower(),
    # "Poland".lower(),
    # "Latvia".lower(),
    # "Andorra".lower(),
    # "Bosnia and Herzegovina".lower(),
    # "Moldova".lower(),
    # "Romania".lower(),
    # "Norway".lower(),
    # "United Kingdom".lower(),
    # "Russia".lower(),
    # "Sweden".lower(),
    # "Spain".lower(),
    # "Germany".lower(),
    # "Ukraine".lower(),
    # "Turkey".lower(),
    # "Denmark".lower(),
    # "Malta".lower(),
    # "Portugal".lower(),
    # "Sweden".lower(),
    # "Monaco".lower(),
    # "Netherlands".lower(),
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


VOTERS = ["Marko", "Rinor", "Luke", "Simon", "Matteo", "Costa", "Rodrigo", "Pedro", "Vladan", "Philip", "Oliver", "Thomas", "Nathan", "Wiv", "Hlynur", "Aivis"]
