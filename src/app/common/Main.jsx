import React from "react";
import {render} from "react-dom";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";

class Main extends ShallowComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.children
        );
    }

}

module.exports = Main;