import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Form from "react-bootstrap/lib/FormGroup";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import Image from "react-bootstrap/lib/Image";
import Button from "react-bootstrap/lib/Button";
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import PasswordInput from "robe-react-ui/lib/inputs/PasswordInput";
import cookie from "react-cookie";

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
            <Col xs={12} md={8} mdOffset={2} lg={4} lgOffset={4}>
                <Form>
                    <Row>
                        <Col xs={8} xsOffset={2}>
                            <Image src="./logo.png" responsive />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="input-group login-input">
                            <Col componentClass="span" className="input-group-addon">
                                <Col componentClass="i" className="glyphicon glyphicon-user" />
                            </Col>
                            <TextInput ref="username" type="email" placeholder="Username" value={this.state.username} onChange={this.__handleChange.bind(undefined,"username")} required autofocus />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="input-group login-input">
                            <Col componentClass="span" className="input-group-addon">
                                <Col componentClass="i" className="glyphicon glyphicon-lock" />
                            </Col>
                            <PasswordInput ref="password" className="form-control" value={this.state.password} onChange={this.__handleChange.bind(undefined,"password")} placeholder="Password" required />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ color: "red" }}> username: demo password:demo</Col>
                    </Row>
                    <Row>
                        <Button className="btn btn-primary btn-login btn-block" type="submit" ref="submitBtn" onClick={this.handleSubmit}>Login
                        </Button>
                    </Row>
                </Form>
            </Col>
        );
    }

    __handleChange(code: any, e: Object): boolean {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[code] = value;
        this.setState(state);
        return true;
    }

    handleSubmit() {
        if (this.state.username === "demo" && this.state.password === "demo") {
            cookie.save("domain", "http://0.0.0.1:8080/", { path: "/" });
            cookie.save("username", this.state.username.trim(), { path: "/" });
            cookie.save("password", this.state.password.trim(), { path: "/" });

            location.reload();
        }
    }
}

module.exports = Login;
