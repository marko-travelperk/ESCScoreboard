import React, {Component} from "react";
import {getFlagForCountry} from "./images";
import {countryNameMap} from "./constants";


export default class RankCountryComponent extends Component {

    render() {
        return(
            <div className={"country"}>
                <span className={"country__rank"}>
                    {this.props.rank}
                </span>
                <span className={"country__flag"}>
                    <img src={getFlagForCountry(this.props.country)}/>
                </span>
                <span className={"country__name"}>
                    {countryNameMap[this.props.country.toLowerCase()]}
                </span>
                {
                    this.props.use12P
                            ?
                        <span className={"country__average"}>
                            {this.props.twelvePointRank}
                        </span>
                            :
                        <span className={"country__average"}>
                            {this.props.averageRank.toFixed(2)}
                        </span>
                }
            </div>
        )
    }
}