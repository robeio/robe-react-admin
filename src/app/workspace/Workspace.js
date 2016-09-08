import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Content from "app/workspace/Content"; // eslint-disable-line import/no-unresolved
import "react-notifications/lib/notifications.css";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

export default class Workspace extends ShallowComponent {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    render(): Object {
        return (
            <div>
                <NotificationContainer />
                <Content content={this.props.children} router={this.context.router} menu={this.props.route.menu} />
            </div>
        );
    }
}
