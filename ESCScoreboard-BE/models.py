import typing as t
from urllib import request

from pip._vendor import requests

ENTRIES: t.List = [
    "Iceland".lower(),
    "Turkey".lower(),
    "Bosnia and Herzegovina".lower(),
    "Sweden".lower(),
    "Armenia".lower(),
    "Malta".lower(),
    "Israel".lower(),
    "Portugal".lower(),
    "Romania".lower(),
    "Macedonia".lower(),
    "Montenegro".lower(),
    "Finland".lower(),
    "Belarus".lower(),
    "Switzerland".lower(),
    "Andorra".lower(),
    "Bulgaria".lower(),
    "Belgium".lower(),
    "Czech Republic".lower(),
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

    def finish_voting(self):
        print(f"{self.current_voter} done! scores {self.current_votes_list}")
        requests.post("http://localhost:5000/reset", {})

    def add_vote(self, country: str, previous_rank: int, new_rank: int):
        self.current_votes_list[country] = new_rank
        requests.post("http://localhost:5000/vote", {
            "country": country,
            "previous_rank": previous_rank,
            "new_rank": new_rank
        })

history: t.List[State] = []


VOTERS = ["Marko", "Rinor", "Luke", "Simon"]