import React, {Component} from "react";
import {getFlagForCountry} from "./images";
import {countryNameMap} from "./constants";
class VotingButtonComponent extends Component {

    render() {
        return (
            <div className={"country country--tiny"}>
                <span className={"country__flag"}>
                    <img src={getFlagForCountry(this.props.country)}/>
                </span>
                <span className={"country__name"}>
                    {countryNameMap[this.props.country.toLowerCase()]}
                </span>
            </div>
        )
    }
}

export default VotingButtonComponent

