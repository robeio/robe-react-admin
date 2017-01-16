import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import AjaxRequest from "robe-react-commons/lib/connections/AjaxRequest";
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

    logoutPost = new AjaxRequest({
        url: "authentication/logout",
        type: "POST"
    });

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
                                style={{margin:4,padding:10,display:this.props.toggled?"none":"inherit"}}
                                className="navbar-toggle pull-left robe-navbar-button">
                            <span className="icon-bar" style={{background:"#173646",height:3}}/>
                            <span className="icon-bar" style={{background:"#173646",height:3}}/>
                            <span className="icon-bar" style={{background:"#173646",height:3}}/>
                        </Button>
                        <Button onClick={this.__onToggle}
                                style={{margin:4.5,padding:5,display:this.props.matches&&this.props.toggled?"inherit":"none"}}
                                className="navbar-toggle pull-left robe-navbar-button">
                            <FaIcon code="fa-arrow-left" size="fa-lg"/>
                        </Button>
                        <Image src="./logo.png"
                               className="pull-left"
                               style={{marginLeft:5}}
                               circle
                               width="40"/>
                        <Link to={window.applicationRootPath}>
                            <Col style={{display:this.props.matches?"none":"inherit"}}>Robe Sample
                                Application</Col>
                        </Link>
                        <Link to={window.applicationRootPath}>
                            <Col style={{display:this.props.matches?"inherit":"none"}}>Robe</Col>
                        </Link>
                    </Col>
                    <Col className="pull-right">
                        <Button
                            className="robe-navbar-button">
                            <FaIcon code="fa-user"/>
                        </Button>
                        <Button
                            className="robe-navbar-button">
                            <FaIcon code="fa-comments-o"/>
                            <Badge>{this.state.messageCount}</Badge>
                        </Button>
                        <Button
                            className="robe-navbar-button">
                            <FaIcon code="fa-bell"/>
                            <Badge>{this.state.notificationCount}</Badge>
                        </Button>
                        <Button
                            className="robe-navbar-button"
                            onClick={this.__onExit}>
                            <FaIcon code="fa-sign-out"/>
                        </Button>
                    </Col>
                </div>
            </Col>
        );
    }

    __onExit = ()=> {
        cookie.remove('domain');
        cookie.remove('username');

        this.logoutPost.call(undefined, undefined,
            function (res) {
                location.reload();
            }.bind(this),
            function (res) {
                location.reload();
            }.bind(this));
    };

    __onToggle = ()=> {
        if (this.props.onToggle)
            this.props.onToggle();
    }
}
