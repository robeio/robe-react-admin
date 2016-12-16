import React from "react";
import {ShallowComponent, AjaxRequest} from "robe-react-commons";
import {Form, Row, Alert, Image, Button, InputGroup} from "react-bootstrap";
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import PasswordInput from "robe-react-ui/lib/inputs/PasswordInput";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";
import SHA256 from "crypto-js/sha256";
import cookie from "react-cookie";
import Card from "libs/card/Card";

class Login extends ShallowComponent {

    loginPost = new AjaxRequest({
        url: "authentication/login",
        type: "POST"
    });

    constructor(props:Object) {
        super(props);
        this.state = {
            username: "",
            password: "",
            rememberme: false
        };
    }

    render():Object {
        return (
            <Card className="center-block"
                  style={{ maxWidth: 300 }}>
                <Form>
                    <Row style={{ textAlign: "center", marginBottom: "30px" }}>
                        <Image src="./logo.png" circle width="150"/>
                    </Row>
                    <Row>
                        <TextInput
                            ref="username"
                            type="email"
                            name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.__handleChange}
                            inputGroupLeft={<InputGroup.Addon><FaIcon code="fa-user" /></InputGroup.Addon>}
                            validationDisplay="overlay"
                            onKeyPress={this.__onKeyPress}
                        />
                    </Row>
                    <Row>
                        <PasswordInput
                            ref="password"
                            name="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.__handleChange}
                            inputGroupLeft={<InputGroup.Addon><FaIcon code="fa-lock" /></InputGroup.Addon>}
                            placeholder="Password"
                            onKeyPress={this.__onKeyPress}
                        />
                    </Row>
                    <Row>
                        <Button
                            className="btn btn-primary btn-login btn-block"
                            ref="submitBtn"
                            onClick={this.__handleSubmit}
                        >
                            Login
                        </Button>
                    </Row>
                    <br />
                    <Row>
                        <Alert bsStyle="info">
                            <p>Username :<b> admin@robe.io</b></p>
                            <p>Password :<b> 123123</b></p>
                        </Alert>
                    </Row>
                </Form>
            </Card>
        );
    }

    __handleChange(e:Object):boolean {
        let state = {};
        state[e.target.name] = e.target.value;
        this.setState(state);
        return true;
    }

    __handleSubmit() {
        cookie.remove("auth-token");
        var username = this.state.username.trim();
        var password = this.state.password.trim();

        if (!password || !username) {
            return;
        }

        let data = {
            username: username,
            password: SHA256(password).toString()
        };


        this.loginPost.call(data, undefined, this.__loginSuccess, this.__loginError);
    }

    __loginSuccess(response, textStatus, xhr) {

        var domain = response.domain;
        var params = domain.split(';');

        var path = "";

        for (var i in params) {
            var param = params[i];
            if (param.indexOf("path") == 0) {
                path = param.split("=")[1];
            }
            if (param.indexOf("domain") == 0) {
                domain = param.split("=")[1];
            }
        }
        cookie.save('domain', domain, {path: path});
        cookie.save('username', response.email, {path: path});

        location.reload();
    }

    __loginError(response:Object) {
        var text = response.responseText;
        switch (response.status) {
            case 200:
                text = "";
                break;
            case 401:
                text = "Kullanıcı adı ya da şifre hatalı girdiniz.";
                break;
            case 500:
                if (text == "User blocked.") {
                    text = "Çok fazla hatalı giriş yaptınız.";
                }
                else {
                    text = "Kullanıcı adı ya da şifre hatalı girdiniz.";
                }
                break;
            default:
                text = "Lütfen daha sonra tekrar deneyiniz.";
                break;
        }
        NotificationManager.error(text);
    }

    __onKeyPress(e) {
        if (e.key == "Enter")
            this.__handleSubmit();
    }
}

module.exports = Login;
