import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import {Navbar, Col, Badge, Image, Button} from "react-bootstrap";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";
import Link from "react-router/lib/Link";
import cookie from "react-cookie";
import "./style.css";

export default class Header extends ShallowComponent {
    static propTypes = {
        matches: React.PropTypes.bool,
        toggled: React.PropTypes.bool
    };

    static defaultProps = {
        toggled: false,
        matches: false
    };

    constructor(props:Object) {
        super(props);
        this.state = {
            data: []
        };
    }

    render():Object {
        return (
            <Col className="robe-navbar">
                <div className="robe-navbar-content">
                    <Col className="pull-left">
                        <Button onClick={this.__onToggle}
                                style={{padding:10,display:this.props.toggled?"none":"inherit"}}
                                className="navbar-toggle pull-left robe-navbar-button">
                            <span className="icon-bar" style={{background:"#173646",height:3}}/>
                            <span className="icon-bar" style={{background:"#173646",height:3}}/>
                            <span className="icon-bar" style={{background:"#173646",height:3}}/>
                        </Button>
                        <Button onClick={this.__onToggle}
                                style={{padding:5.5,display:this.props.matches&&this.props.toggled?"inherit":"none"}}
                                className="navbar-toggle pull-left robe-navbar-button">
                            <FaIcon code="fa-arrow-left" size="fa-lg"/>
                        </Button>
                        <Image src="./logo.png"
                               className="pull-left"
                               circle
                               width="50"/>
                        <Link to={window.applicationRootPath}>
                            <Col style={{paddingTop:15,display:this.props.matches?"none":"inherit"}}>Robe Sample
                                Application</Col>
                        </Link>
                        <Link to={window.applicationRootPath}>
                            <Col style={{paddingTop:15,display:this.props.matches?"inherit":"none"}}>Robe</Col>
                        </Link>
                    </Col>
                    <Col className="pull-right">
                        <Button
                            className="robe-navbar-button">
                            <FaIcon code="fa-user" size="fa-lg"/>
                        </Button>
                        <Button
                            className="robe-navbar-button">
                            <FaIcon code="fa-comments-o" size="fa-lg"/>
                            <Badge>{this.state.messageCount}</Badge>
                        </Button>
                        <Button
                            className="robe-navbar-button">
                            <FaIcon code="fa-bell" size="fa-lg"/>
                            <Badge>{this.state.notificationCount}</Badge>
                        </Button>
                        <Button
                            className="robe-navbar-button"
                            onClick={this.__onExit.bind(undefined,"header-exit-icon")}>
                            <FaIcon code="fa-sign-out" size="fa-lg"/>
                        </Button>
                    </Col>
                </div>
            </Col>
        );
    }

    __onExit = ()=> {
        cookie.remove("domain", {path: "/"});
        cookie.remove("username", {path: "/"});
        cookie.remove("password", {path: "/"});
        location.reload();
    };

    __onToggle = ()=> {
        if (this.props.onToggle)
            this.props.onToggle();
    }
}
