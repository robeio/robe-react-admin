import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Content from "app/workspace/Content";
import "react-notifications/lib/notifications.css";
import NotificationContainer from "react-notifications/lib/NotificationContainer";


class Workspace extends ShallowComponent {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <NotificationContainer/>
                <Content content={this.props.children} router={this.context.router} menu={this.props.route.menu}/>
            </div>
        );
    };
}

module.exports = Workspace;

