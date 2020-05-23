import typing as t
from urllib import request

from pip._vendor import requests

ENTRIES: t.List = [
    "Croatia".lower(),
    "Ireland".lower(),
    "Latvia".lower(),
    "Serbia".lower(),
    "Poland".lower(),
    "Norway".lower(),
    "Cyprus".lower(),
    "Slovakia".lower(),
    "Denmark".lower(),
    "Slovenia".lower(),
    "Hungary".lower(),
    "Azerbaijan".lower(),
    "Greece".lower(),
    "Lithuania".lower(),
    "Moldova".lower(),
    "Albania".lower(),
    "Ukraine".lower(),
    "Estonia".lower(),
    "Netherlands".lower()
]


class State:
    current_voter: str
    current_votes_list: t.Dict[str, int]

    def __init__(self):
        self.current_votes_list = dict()

    def change_name(self, name):
        self.current_voter = name
        requests.post("http://localhost:5000/name", {
            "name": name
        })

    def finish_voting(self, exporter: "Exporter"):
        print(f"{self.current_voter} done! scores {self.current_votes_list}")
        exporter.add_votes(self.current_votes_list, self.current_voter)
        requests.post("http://localhost:5000/reset", {})

    def add_vote(self, country: str, previous_rank: int, new_rank: int):
        self.current_votes_list[country] = new_rank
        requests.post("http://localhost:5000/vote", {
            "country": country,
            "previous_rank": previous_rank,
            "new_rank": new_rank
        })

history: t.List[State] = []


VOTERS = ["Marko", "Rinor", "Luke", "Simon", "Matteo", "Costa", "Rodrigo", "Pedro", "Vladan", "Philip", "Oliver", "Thomas", "Nathan", "FSE", "Hlynur"]
