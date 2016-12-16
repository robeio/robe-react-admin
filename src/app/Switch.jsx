import React from "react";
import { ShallowComponent, AjaxRequest } from "robe-react-commons";
import HasAuthorization from "./HasAuthorization";
import NoAuthorization from "./NoAuthorization";

export default class Switch extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        this.state = {
            hasAuth: false,
            menu: undefined
        };
    }

    render(): Object {
        if (this.state.hasAuth) {
            if (!this.state.menu) {
                return (<span>Loading please wait</span>);
            }
            return (<HasAuthorization menu={this.state.menu} />);
        }
        return (<NoAuthorization />);
    }

    componentDidMount() {
        let readRequest = new AjaxRequest({
            url: "menus/user",
            type: "GET"
        });

        readRequest.call(undefined, undefined, (response: Object) => {
            this.setState({ menu: response, hasAuth: true });
        }, (error: Object) => {
            this.setState({ menu: undefined, hasAuth: false });
        });
    }
}
