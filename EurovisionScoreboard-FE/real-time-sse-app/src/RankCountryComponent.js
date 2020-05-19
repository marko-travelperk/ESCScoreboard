import React, {Component} from "react";
import {getFlagForCountry} from "./images";
import {countryNameMap} from "./constants";


export default class RankCountryComponent extends Component {

    render() {
        return(
            <span className={"telaviv"}>
                <span className={"leftallignnum vertical-center"}>
                    {this.props.rank}.
                </span>
                <span className={"leftallignflag vertical-center"}>
                    <img src={getFlagForCountry(this.props.country)} alt={"RS"}/>
                </span>
                <span className={"leftalligncountry vertical-center"}>
                    {countryNameMap[this.props.country.toLowerCase()]}
                </span>
                <span className={"rightallign vertical-center"}>
                    {this.props.averageRank.toFixed(2)}
                </span>
                <br/>
            </span>
        )
    }
}