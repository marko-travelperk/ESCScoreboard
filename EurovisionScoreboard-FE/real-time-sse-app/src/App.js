import React, { Component } from 'react';
import './App.css';
import NameComponent from "./NameComponent";
import OngoingRankComponent from "./OngoingRankComponent";
import ScoreboardComponent from "./ScoreboardComponent";
import {countryNameMap, countries, rankToPointsMap, all_voters} from "./constants";
import VotingComponent from "./VotingComponent";
import FlipMove from "react-flip-move";
import VotingButtonComponent from "./VotingButtonComponent";
import OngoingRankCountryComponent from "./OngoingRankCountryComponent";
import { saveAs } from 'file-saver';

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
            "voters": [],
            "currentVoter": "",
            "twelves": false,
            "count": countries.length,
            "remainingVoters": all_voters
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

    removeVote(data){
        let currentVotes = this.state.currentVoting
        let ranking = this.state.overallRanking
        for (var country in currentVotes){
            if(currentVotes[country] < currentVotes[data.country]){
                currentVotes[country]++;
            }
        }
        delete currentVotes[data.country]
        let countryVoteList = ranking[data.country]
        countryVoteList.pop()

        this.setState({"currentVoting": currentVotes, "overallRanking": ranking})

    }


    cancelCurrentVote(){
        let currentVotes = this.state.currentVoting
        let ranking = this.state.overallRanking
        for (const country in currentVotes)  {
            ranking[country].pop()
        }
        this.setState({
            "overallRanking": ranking,
            "currentVoting":{},
            "currentVoter": "Up next..."
        })
    }

    parseName(event){
        this.setState({"currentVoter": event.name})
    }

    endvote(){
        let voters = this.state.voters
        voters.push(this.state.currentVoter)
        let remaining = []
        for (let i = 0; i < this.state.remainingVoters.length; i++) {
            if (this.state.remainingVoters[i] !== this.state.currentVoter) {
                remaining.push(this.state.remainingVoters[i])
            }
        }

        this.setState({
            "currentVoting":{},
            "voters": voters,
            "count": countries.length,
            "currentVoter": "Up next..."
            "remainingVoters": remaining
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
        this.eventSource.addEventListener('cancel', e => {
            this.cancelCurrentVote()
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

    popVote(event){
        if(!event)
            return
        this.removeVote({"country": event})
        this.state.count++;
    }

    pushVote(event){
        if(!event)
            return
        console.log("uuu" + event)
        this.addVote({"country": event, "new_rank": this.state.count})
        this.state.count--;
    }

    votingPanel(ranking){
        var list = []
        for(var i = 0; i < countries.length; i++) {
            const country = countries[i]
            if (!(country in this.state.currentVoting)){
                list.push(country)
            }
        }
        return(
            <FlipMove  enterLeaveAnimation="elevator" >
                {
                    list.map(
                        (value, index) => {
                            return (
                                <span key={value}><button key={value} value={value} onClick={e => this.pushVote(e.target.value)}> <VotingButtonComponent country={value} key={value}/></button></span>
                            )
                        }
                    )
                }
            </FlipMove>
        )

    }

    sortDict(dict){
        // Create items array
        var items = Object.keys(dict).map(function(key) {
            return [key, dict[key]];
        });

        // Sort the array based on the second element
        items.sort(function(first, second) {
            return first[1] - second[1];
        });
        return items
    }

    ongoingRank() {
        const ranked = this.sortDict(this.state.currentVoting)
        if (!ranked || !ranked.length){
            return "May we have your votes please?"
        }
        return(
            <span>
            <FlipMove  enterLeaveAnimation="elevator" >
                {
                    ranked.map(
                        (value, index) => {
                            return (
                                <span key={value[1]}><button key={value[1]} value={value[0]}  onClick={ e => this.popVote(e.target.value)} ><OngoingRankCountryComponent country={value[0]} rank={value[1]}/></button></span>
                            )
                        }
                    )
                }
            </FlipMove>
                <button onClick={this.endvote.bind(this)}>Submit</button>
            </span>
        )
    }

    capitalizeWords(str)
    {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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
                {this.ongoingRank()}
            </div>
          </div>
          <div className={"Buttons"}>
            <button className={"Button Button--random"} onClick={this.addRandomVote.bind(this)}>Random vote</button>
            <button className={"Button Button--12"} onClick={this.switchTwelveState.bind(this)}>{this.state.twelves ? "Use Ranking" :  "Use 12p system" }</button>
          </div>
          <div className={"VotingButtons"}>
              {this.votingPanel()}
          </div>
          <div>
              {this.state.remainingVoters.map(
                  name => {
                      return(
                          <button value={name} onClick={e=> this.setState({"currentVoter": e.target.value})}>{name}</button>
                      )
                  }
              )}
          </div>
          <button onClick={e => {
              let content = []
              content.push("country")
              content.push(this.state.voters)
              content.push("\n")

              for (var country in this.state.overallRanking){
                  var line = [this.capitalizeWords(country)]
                  line.push(this.state.overallRanking[country])
                  line.push("\n")
                  content.push(line)
              }
              saveAs(new Blob(content, {type: "text/csv;charset=utf-8"}), "test.txt")}
          }>Save file</button>
      </div>
    );
  }
}

export default App;
