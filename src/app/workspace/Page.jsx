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

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Col className="page-content">
                <Panel style={{minHeight:500, paddingBottom:40}}>
                    <Col style={{marginTop:0}} className="page-header">
                        <h2>{this.props.header}</h2>
                    </Col>
                    {this.__renderPageInfo()}
                    {this.props.children}
                </Panel>
            </Col>
        );
    };

    __renderPageInfo = ()=> {
        let icon = "";
        if (this.props.icon) {
            icon = this.props.icon == true ? "fa-info-circle" : this.props.icon;
        }

        if (this.props.bsStyle == undefined || this.props.bsStyle == "" || this.props.bsStyle == true) {
            return (<Col><FaIcon code={icon} size={"fa-sm"}/> {this.props.description}</Col>);
        } else {
            return (<Alert bsStyle={this.props.bsStyle}><FaIcon code={icon} size={"fa-sm"}/> {this.props.description}</Alert>)
        }

    }
}