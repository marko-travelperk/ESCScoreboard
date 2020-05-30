from pip._vendor import requests

ENTRIES = [
    # "Croatia".lower(),
    "Ireland".lower(),
    # "Norway".lower(),
    "Denmark".lower(),
    # "Azerbaijan".lower(),
    # "Greece".lower(),
    # "Moldova".lower(),
    # "Albania".lower(),
    "Estonia".lower(),
    "Macedonia".lower(),
    # "France".lower(),
    # "United Kingdom".lower(),
    # "Spain".lower(),
    # "Germany".lower(),
    "Finland".lower(),
    "Malta".lower(),
    "Portugal".lower(),
    "Russia".lower(),
    "Turkey".lower(),
    "Iceland".lower(),
    "Bosnia and Herzegovina".lower(),
    "Andorra".lower(),
    "Armenia".lower(),
    # "Switzerland".lower(),
    "Ukraine".lower(),
    "Sweden".lower(),
    "Belgium".lower(),
    "Cyprus".lower(),
    "Poland".lower(),
    "Monaco".lower(),
    "Netherlands".lower(),
    "Bulgaria".lower(),
    "Lithuania".lower(),
    "Belarus".lower(),
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
