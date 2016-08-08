import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import FaIcon from "robe-react-ui/lib/FaIcon";

class NotFound extends ShallowComponent {

    static style = {
        "verticalAlign": "middle",
        "textAlign": "center",
        "paddingTop": 150
    };

    render() {
        return (<div style={NotFound.style}>
            <FaIcon code="fa-frown-o" size="fa-4x"/>
            <h1>Sorry, 404 page not found.</h1>
        </div>);
    }
}
module.exports = NotFound;