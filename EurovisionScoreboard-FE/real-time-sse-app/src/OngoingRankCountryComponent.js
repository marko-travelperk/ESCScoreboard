import React, {Component} from "react";
import {getFlagForCountry} from "./images";
import {countryNameMap} from "./constants";
class OngoingRankCountryComponent extends Component {

    render() {
        return (
            <div className={"country country--small"}>
                <span className={"country__rank"}>
                    #{this.props.rank}
                </span>
                <span className={"country__flag"}>
                    <img src={getFlagForCountry(this.props.country)} alt={"RS"}/>
                </span>
                <span className={"country__name"}>
                    {countryNameMap[this.props.country.toLowerCase()]}
                </span>
            </div>
        )
    }
}

export default OngoingRankCountryComponent

