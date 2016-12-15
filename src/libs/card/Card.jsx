import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Col from "react-bootstrap/lib/Col";
import Panel from "react-bootstrap/lib/Panel";
import "libs/card/style.css";

export default class Card extends ShallowComponent {

    static propTypes = {
        header: React.PropTypes.any,
        borderless: React.PropTypes.bool,
        unfilled: React.PropTypes.bool,
        unShadow: React.PropTypes.bool,
        actions: React.PropTypes.any,
        xs: React.PropTypes.number,
        sm: React.PropTypes.number,
        md: React.PropTypes.number,
        lg: React.PropTypes.number

    };

    static defaultProps = {
        header: undefined,
        borderless: false,
        unfilled: false,
        unShadow: false,
        actions: undefined,
        xs: undefined,
        sm: undefined,
        md: undefined,
        lg: undefined
    };

    render() {
        var className = "card";
        if (this.props.borderless)
            className += " borderless";
        if (this.props.unfilled)
            className += " unfilled";
        if (this.props.unShadow)
            className += " unShadow";
        return (
            <Col
                xs={this.props.xs}
                sm={this.props.sm}
                md={this.props.md}
                lg={this.props.lg}
                style={{padding:"0px 5px 0px 5px"}}>
                <Panel
                    className={className}
                    style={this.props.style}
                    header={this.__renderHeader()}>
                    {this.props.children}
                </Panel>
            </Col>
        );
    };


    __renderHeader = ()=> {
        if (this.props.header)
            return (
                <Col className="card-header">
                    <Col className="pull-right"
                         style={{paddingTop:8,fontSize:12}}>
                        {this.props.actions}
                    </Col>
                    <h5>
                        <b style={{color:"#337ab7",opacity:0.8}}>
                            {this.props.header}
                        </b>
                    </h5>
                </Col>
            );
        return undefined;
    };
}