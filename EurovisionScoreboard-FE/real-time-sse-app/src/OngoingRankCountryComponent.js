import React, {Component} from "react";
import {getSmallFlagForCountry} from "./images";
import {countryNameMap} from "./constants";
class OngoingRankCountryComponent extends Component {

    render() {
        return (
            <span className={"telavivcompact"}>
                {this.props.rank + ".   "}
                <img src={getSmallFlagForCountry(this.props.country)} alt={"RS"}/>
                {"   " + countryNameMap[this.props.country]}
            </span>
        )
    }
}

export default OngoingRankCountryComponent

