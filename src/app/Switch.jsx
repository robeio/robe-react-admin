import React from "react";
import {ShallowComponent, AjaxRequest} from "robe-react-commons";
import cookie from "react-cookie";
import HasAuthorization from "./HasAuthorization";
import NoAuthorization from "./NoAuthorization";

export default class Switch extends ShallowComponent {
    constructor(props:Object) {
        super(props);
        this.state = {
            hasAuth: false,
            menu: undefined
        };
    }

    render():Object {
        if (this.state.hasAuth) {
            if (!this.state.menu) {
                return (<span>Loading please wait</span>);
            }
            return (<HasAuthorization menu={this.state.menu}/>);
        }
        return (<NoAuthorization />);
    }

    componentDidMount = () => {
        if (this.state.hasAuth) {
            let readRequest = new AjaxRequest({
                url: "http://127.0.0.1:8081/robe/menus",
                type: "GET"
            });

            readRequest.call(undefined, undefined, (response:Object) => {
                console.log(response)
                this.setState({menu: response});
            });
        }
    };
}
