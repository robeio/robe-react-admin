import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Col from "react-bootstrap/lib/Col";
import Panel from "react-bootstrap/lib/Panel";
import Alert from "react-bootstrap/lib/Alert";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";

export default class Page extends ShallowComponent {

    static propTypes = {
        header: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        bsStyle: React.PropTypes.string,
        icon: React.PropTypes.string,
    };

    static defaultProps = {
        bsStyle: "",
        icon: "fa-info-circle"
    };

    render(): Object {
        return (
            <Col className="page-content">
                <Panel style={{ minHeight: 500, paddingBottom: 40 }}>
                    <Col style={{ marginTop: 0 }} className="page-header">
                        <h2>{this.props.header}</h2>
                    </Col>
                    {this.__renderPageInfo()}
                    {this.props.children}
                </Panel>
            </Col>
        );
    }

    __renderPageInfo(): Object {
        let icon = <FaIcon code={this.props.icon} size={"fa-sm"} />;
        if (this.props.bsStyle === "") {
            return (<Col>{icon}{this.props.description}</Col>);
        }
        return (<Alert bsStyle={this.props.bsStyle}><Col>{icon}{this.props.description}</Col></Alert>);
    }
}
