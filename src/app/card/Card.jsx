import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Col from "react-bootstrap/lib/Col";
import "./style.css";

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
        if (this.props.className)
            className += " " + this.props.className;
        return (
            <Col
                xs={this.props.xs}
                sm={this.props.sm}
                md={this.props.md}
                lg={this.props.lg}
                className={className}
                style={this.props.style}>
                <Col className="card-header"
                     style={{display:this.props.header?"inherit":"none"}}>
                    <Col className="card-title">
                        <h4>{this.props.header}</h4>
                    </Col>
                </Col>
                <Col className="card-content">
                    {this.props.children}
                </Col>
            </Col>
        );
    };
}