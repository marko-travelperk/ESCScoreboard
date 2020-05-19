import React, { Component } from 'react';
import {GridList} from "material-ui";


export class GridListWithProps extends Component {
    render() {
        return (
            <GridList>
                cols={2}
                cellHeight={155}
                style={{margin: 40}}
            >
                {this.props.children}
            </GridList>
        );
    }
}