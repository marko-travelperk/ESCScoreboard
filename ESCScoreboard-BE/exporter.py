import os

class Exporter:

    def __init__(self, filename, countries):
        self.filename = filename
        countries.sort()
        with open(filename, "w+") as handle:
            handle.write("country\n")
            for country in countries:
                handle.write(country + "\n")

    def add_votes(self, votes, voter_name):
        with open(self.filename, "r") as inhandle:
            with open("testout.txt", "w") as outhandle:
                i = 0
                for line in inhandle:
                    line = line.rstrip('\n')
                    # if i == len(list(votes.values())):
                    #     break
                    if i == 0:
                        outhandle.write(line + "," + voter_name + "\n")
                        i += 1
                        continue
                    country = line.split(',')[0]
                    rank = votes[country]
                    outhandle.write(line + "," + rank + "\n")
                    i += 1
        os.remove(self.filename)
        os.rename("testout.txt", self.filename)