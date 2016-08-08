import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Router from "react-router/lib/Router";
import BrowserHistory from "react-router/lib/browserHistory";

class HasAuthorization extends ShallowComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (<Router key="root" history={BrowserHistory} onUpdate={() => window.scrollTo(0, 0)}/>);
    }

}

module.exports = HasAuthorization;