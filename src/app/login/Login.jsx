import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import { Form, Row, Alert, Image, Button, InputGroup } from "react-bootstrap";
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import PasswordInput from "robe-react-ui/lib/inputs/PasswordInput";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";

import cookie from "react-cookie";
import Card from "libs/card/Card";

class Login extends ShallowComponent {

    constructor(props: Object) {
        super(props);
        this.state = {
            username: "",
            password: "",
            rememberme: false
        };
    }

    render(): Object {
        return (
            <div className="center-block"
                style={{ maxWidth: 300 }}>
                <Card>
                    <Form method="post" action="http://127.0.0.1:8081/robe/authentication">
                        <Row style={{textAlign:"center", marginBottom:"30px"}}>
                            <Image src="./logo.png" circle width="150" />
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
                                />
                        </Row>
                        <Row>
                            <Button
                                className="btn btn-primary btn-login btn-block"
                                type="submit"
                                ref="submitBtn"
                                onClick={this.handleSubmit}
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
            </div>
        );
    }

    __handleChange(e: Object): boolean {
        let state = {};
        state[e.target.name] = e.target.value;
        this.setState(state);
        return true;
    }

    handleSubmit() {
        // cookie.save("domain", "http://0.0.0.1:8080/", { path: "/" });
        // cookie.save("username", this.state.username.trim(), { path: "/" });
        // cookie.save("password", this.state.password.trim(), { path: "/" });
        // location.reload();
    }
}

module.exports = Login;
