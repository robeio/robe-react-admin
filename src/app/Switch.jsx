import React from "react";
import { ShallowComponent, AjaxRequest } from "robe-react-commons";
import cookie from "react-cookie";

export default class Switch extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            hasAuth: (cookie.load("username") === "demo" && cookie.load("password") === "demo"),
            menu: undefined
        };
    }

    render() {
        if (this.state.hasAuth) {
            if (!this.state.menu) {
                return (<span>Loading please wait</span>);
            }
            let HasAuthorization = require("./HasAuthorization").default;
            return (<HasAuthorization menu={this.state.menu} />);
        }
        let NoAuthorization = require("./NoAuthorization").default;
        return (<NoAuthorization />);
    }

    componentDidMount = () => {
        if (this.state.hasAuth) {
            let _readRequest = new AjaxRequest({
                url: "http://localhost:3000/menus",
                type: "GET"
            });

            _readRequest.call(undefined, undefined, (response) => {
                this.setState({ menu: response });
            });
        }
    };
}
