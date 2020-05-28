#!/usr/bin/env python
from tkinter import *
from tkinter.ttk import Combobox

from exporter import Exporter
from models import ENTRIES, State, VOTERS

exporter = Exporter("votes.csv", ENTRIES)


def start_gui():
    state = State()

    global window
    window = Tk()
    window.title("Eurovision simulator control panel")
    scores_vars = {}

    for country in ENTRIES:
        scores_vars[country.lower()] = 0


    def handle_vote_change(event):
        widget = event.widget
        widget_name = widget.extra
        country = widget_name.split("_")[0]
        widget_value = widget.get()
        country_rank = scores_vars[country]
        scores_vars[country] = widget_value
        state.add_vote(country=country, previous_rank=country_rank, new_rank=widget_value)

    offset = 0
    split = int(len(ENTRIES)/2) + 1
    for entry in ENTRIES:
        column = 2 if offset >= split else 0
        row = offset%split
        lbl = Label(window, text=entry.upper())
        lbl.extra = f"{entry.lower()}_label"
        lbl.grid(column=column, row=row, sticky="nsew")
        offset += 1

        combo = Combobox(window)
        combo.extra = f"{entry.lower()}_rank"
        combo["values"] = list(range(1, len(ENTRIES)+1))
        combo.grid(column=column+1, row=row, sticky="nsew")
        combo.bind("<<ComboboxSelected>>", handle_vote_change)

    name_label = Label(window, text="Voter name:")
    name_label.grid(column=4, row=2, sticky="nsew")

    # name_input = Entry(window, width=30)
    name_input = Combobox(window)
    name_input["values"] = VOTERS
    name_input.grid(column=4, row=3, sticky="nsew")

    def handle_name_change(event):
        state.change_name(name_input.get())

    name_input.bind("<<ComboboxSelected>>", handle_name_change)

    def submit():
        state.finish_voting(exporter=exporter)
        reset_screen()

    submit_vote_button = Button(window, text="Submit Vote", command=submit)
    submit_vote_button.grid(column=4, row=5, sticky="nsew")

    for column in range(5):
        window.grid_columnconfigure(column, weight=1)
    for row in range(split):
        window.grid_rowconfigure(row, weight=1)
    window.mainloop()


def reset_screen():
    window.destroy()
    start_gui()



start_gui()
