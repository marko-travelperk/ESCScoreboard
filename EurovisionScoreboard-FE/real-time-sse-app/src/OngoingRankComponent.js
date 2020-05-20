import React, {Component} from "react";
import OngoingRankCountryComponent from "./OngoingRankCountryComponent";
import FlipMove from "react-flip-move";

class OngoingRankComponent extends Component{
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

    render() {
        const ranked = this.sortDict(this.props.ranking)
            if (!ranked || !ranked.length){
                return "May we have your votes please?"
            }
        return(
            <FlipMove  enterAnimation="elevator" >
                {
                    ranked.map(
                        (value, index) => {
                            return (
                                <OngoingRankCountryComponent country={value[0]} rank={value[1]} key={index}/>
                            )
                        }
                    )
                }
            </FlipMove>
        )
    }
}

export default OngoingRankComponent