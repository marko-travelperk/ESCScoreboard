import React, {Component} from "react";
import RankCountryComponent from "./RankCountryComponent";
import FlipMove from "react-flip-move";


class ScoreboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {"twelves": false}
    }

    render(){
        if (!this.props.ranking || !this.props.ranking.length){
            return "May we have your votes please?"
        }
        const limit = Math.trunc(this.props.ranking.length/2)
        return(
            <div>
                <FlipMove duration={250} staggerDurationBy={20} staggerDelayBy={20} enterAnimation="elevator" leaveAnimation="elevator" appearAnimation={"accordionVertical"} >
                {this.props.ranking
                    .sort((a,b) => {
                        if (this.props.twelvePointSystem){
                            return b.twelvePointRank - a.twelvePointRank
                        }
                        if (!a.averageRank || !b.averageRank){
                            return b.averageRank - a.averageRank
                        }
                        return a.averageRank - b.averageRank
                    }
                    ).map(
                        (value, index) => {
                            const key = index >= limit ? (index +1 - limit) * 2 : (index+1) * 2 - 1
                            value["key"] = key
                            value["rank"] = index+1

                            return value
                        }
                    ).
                    // sort(
                    //     (a,b) =>  a.key - b.key
                    // ).
                    map(
                    (value, index) => {
                        return (
                            <RankCountryComponent className={``} key={value.country} country={value.country} rank={value.rank} averageRank={value.averageRank} twelvePointRank={value.twelvePointRank} use12P={this.props.twelvePointSystem}/>
                        )
                    }
                )}
            </FlipMove>
                <br/>
            </div>
        )
    }

}

export default ScoreboardComponent