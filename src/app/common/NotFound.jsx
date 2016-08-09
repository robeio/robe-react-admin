import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";

export default class NotFound extends ShallowComponent {

    static style = {
        "verticalAlign": "middle",
        "textAlign": "center",
        "paddingTop": 150
    };

    render() {
        return (<div style={NotFound.style}>
            <h1>Sorry, 404 page not found.</h1>
        </div>);
    }
}