import React, {Component} from "react";
import RankCountryComponent from "./RankCountryComponent";
import FlipMove from "react-flip-move";


class ScoreboardComponent extends Component {

    render(){
        if (!this.props.ranking || !this.props.ranking.length){
            return "May we have your votes please?"
        }
        const limit = Math.trunc(this.props.ranking.length/2)
        return(
            <FlipMove enterAnimation="elevator" >
                {this.props.ranking
                    .sort((a,b) => {
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
                            console.log(value.country + "key " + key + "index " + index + " rank " + value.rank)

                            return value
                        }
                    ).
                    // sort(
                    //     (a,b) =>  a.key - b.key
                    // ).
                    map(
                    (value, index) => {
                        return (
                            <RankCountryComponent className={''} key={index} country={value.country} rank={value.rank} averageRank={value.averageRank}/>
                        )
                    }
                )}
            </FlipMove>
        )
    }

}

export default ScoreboardComponent