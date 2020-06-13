import React, { Component } from 'react';
import './App.css';
import NameComponent from "./NameComponent";
import OngoingRankComponent from "./OngoingRankComponent";
import ScoreboardComponent from "./ScoreboardComponent";
import {countryNameMap, countries, rankToPointsMap} from "./constants";

class App extends Component {
    constructor(props) {
        super(props);
        let initial = {}
        countries.forEach(country => {
            initial[country.toLowerCase()] = []
        })
//        initial = {"serbia": []}
        this.state = {
            "overallRanking":initial,
            "currentVoting": {},
            "currentVoter": "",
            "twelves": false
        }
        this.eventSource = new EventSource("http://localhost:5000/stream");
    }

    addVote(data){
        let currentVotes = this.state.currentVoting
        let ranking = this.state.overallRanking
        let countryVoteList = ranking[data.country]
        if (data.previous_rank && countryVoteList.length && data.previous_rank === countryVoteList[countryVoteList.length - 1]){
             countryVoteList.pop()
        }
        currentVotes[data.country] = data.new_rank

        countryVoteList.push(data.new_rank)
        ranking[data.country] = countryVoteList
        this.setState({"currentVoting": currentVotes, "overallRanking": ranking})
    }

    parseName(event){
        this.setState({"currentVoter": event.name})
    }

    endvote(){
        this.setState({
            "currentVoting":{},
            "currentVoter": "And now we go to..."
        })
    }

    componentDidMount() {
        this.eventSource.addEventListener('name', e => {
            this.parseName(JSON.parse(e.data))
        })
        this.eventSource.addEventListener('vote', e => {
            this.addVote(JSON.parse(e.data))
        })
        this.eventSource.addEventListener('reset', e => {
            this.endvote()
        })
    }

    getRanking(){
        let ranking = []
        for (var country in this.state.overallRanking){
            const arrayOfVotes = this.state.overallRanking[country]
            const sum = arrayOfVotes.reduce((a, b) => parseInt(a) + parseInt(b), 0);
            let twelvePointSum = 0
            arrayOfVotes.forEach( x => twelvePointSum += rankToPointsMap[x] || 0)
            console.log("points "+ arrayOfVotes + " 12p sum " + twelvePointSum)
            const avg = (sum / arrayOfVotes.length) || 0;
            ranking.push({"country": country, "averageRank": avg, "twelvePointRank": twelvePointSum})
        }
        return ranking
    }

    addRandomVote(){
        const votes = this.state.currentVoting
        const country = countries[Math.floor(Math.random() * countries.length)].toLowerCase()
        const rank = Math.floor(Math.random() * countries.length)+1
        this.addVote({"country": country, "new_rank": rank})
        this.setState({"currentVoting": votes})
    }

    switchTwelveState(){
        this.setState({"twelves": !this.state.twelves})
    }

    render() {
        console.log(this.state.overallRanking)
    return (
      <div className="App">
          <div className={"Logo"}>
            <img src={require('./img/logo.svg')} />
          </div>
          <div className={"Scoreboard"}>
            <ScoreboardComponent ranking={this.getRanking()} twelvePointSystem={this.state.twelves}/>
          </div>
          <div className={"Voting"}>
            <NameComponent voterName={this.state.currentVoter}/>
            <div className={"Ranking"}>
                <OngoingRankComponent ranking={this.state.currentVoting} />
            </div>
          </div>
          <div className={"Buttons"}>
            {/*<button className={"Button Button--random"} onClick={this.addRandomVote.bind(this)}>Random vote</button>*/}
            <button className={"Button Button--12"} onClick={this.switchTwelveState.bind(this)}>Use 12p system</button>
          </div>
      </div>
    );
  }
}

export default App;
