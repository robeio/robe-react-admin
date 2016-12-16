import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Navbar from "react-bootstrap/lib/Navbar";
import Button from "react-bootstrap/lib/Button";
import Col from "react-bootstrap/lib/Col";
import Badge from "react-bootstrap/lib/Badge";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";
import Link from "react-router/lib/Link";
import cookie from "react-cookie";

export default class Header extends ShallowComponent {
    constructor(props:Object) {
        super(props);
        this.state = {
            data: []
        };
    }

    static buttonGroupStyle = {
        padding: "15px 0px 0px 0px",
        marginRight: -25
    };

    static buttonStyle = {
        padding: 0,
        marginRight: 8,
        background: "transparent",
        border: 0,
        color: "#fff",
        transition: ".6s",
        opacity: "1"
    };

    render():Object {
        return (
            <Navbar fluid fixedTop inverse className="container-fluid">
                <Button onClick={this.props.open} className="navbar-toggle pull-left">
                    <Col componentClass="span" className="sr-only">Toggle navigation</Col>
                    <Col componentClass="span" className="icon-bar"/>
                    <Col componentClass="span" className="icon-bar"/>
                    <Col componentClass="span" className="icon-bar"/>
                </Button>
                <Link to={window.applicationRootPath}>
                    <Navbar.Brand>
                        <Col style={{paddingTop:15}} className="hidden-xs">Robe Sample Application</Col>
                    </Navbar.Brand>
                </Link>
                <Link className="content" to={window.applicationRootPath}>
                    <Navbar.Brand>
                        <Col style={{paddingTop:15}} className="visible-xs">Robe</Col>
                    </Navbar.Brand>
                </Link>
                <Col className="pull-right" style={Header.buttonGroupStyle}>
                    <Button
                        style={Header.buttonStyle}>
                        <FaIcon code="fa-user" size="fa-lg"/>
                    </Button>
                    <Button
                        style={Header.buttonStyle}>
                        <FaIcon code="fa-comments-o" size="fa-lg"/>
                        <Badge>{this.state.messageCount}</Badge>
                    </Button>
                    <Button
                        style={Header.buttonStyle}>
                        <FaIcon code="fa-bell" size="fa-lg"/>
                        <Badge>{this.state.notificationCount}</Badge>
                    </Button>
                    <Button
                        style={Header.buttonStyle}
                        onClick={this.__onExit.bind(undefined,"header-exit-icon")}>
                        <FaIcon code="fa-sign-out" size="fa-lg"/>
                    </Button>
                </Col>
            </Navbar>

        );
    }

    __onExit = ()=> {
        cookie.remove("domain", {path: "/"});
        cookie.remove("username", {path: "/"});
        cookie.remove("password", {path: "/"});
        location.reload();
    }
}
