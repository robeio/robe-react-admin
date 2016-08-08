import React from "react";
import {ShallowComponent, AjaxRequest} from "robe-react-commons";
import cookie from "react-cookie";

class Switch extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            hasAuth: (cookie.load("username") === "demo" && cookie.load("password") === "demo"),
            menu: []
        };
    }

    render() {
        if (this.state.hasAuth) {
            if (this.state.menu.length == 0) {
                return (<span>Loading please wait</span>);
            } else {
                let HasAuthorization = require("app/HasAuthorization");
                return (<HasAuthorization menu={this.state.menu}/>);
            }

        } else {
            let NoAuthorization = require("app/NoAuthorization");
            return (<NoAuthorization/>);
        }
    };

    componentDidMount = () => {
        if (this.state.hasAuth) {
            let _readRequest = new AjaxRequest({
                url: "http://localhost:3000/menu",
                type: "GET"
            });

            _readRequest.call(undefined, undefined, (response)=> {
                this.setState({menu: response});
            });
        }
    };
}

module.exports = Switch;