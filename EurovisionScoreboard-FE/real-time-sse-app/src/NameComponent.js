import React, {Component} from "react";

class NameComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {voterName: "Marko"}
    }


    render() {
        return (
            <h1>{this.props.voterName}</h1>
        )
    }
}

export default NameComponent