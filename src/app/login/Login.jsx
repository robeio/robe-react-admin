import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Form from "react-bootstrap/lib/FormGroup";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import Image from "react-bootstrap/lib/Image";
import Button from "react-bootstrap/lib/Button";
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import PasswordInput from "robe-react-ui/lib/inputs/PasswordInput";
import cookie from "react-cookie";
import Card from "libs/card/Card";

class Login extends ShallowComponent {

    constructor(props:Object) {
        super(props);
        this.state = {
            username: "",
            password: "",
            rememberme: false
        };

        this.__usernameHandleChange = this.__handleChange.bind(undefined, "username");
        this.__passwordHandleChange = this.__handleChange.bind(undefined, "password");
    }

    render():Object {
        return (
            <div className="center-block"
                 style={{maxWidth:300}}>
                <Card>
                    <Form>
                        <Row>
                            <Image src="./logo.png" responsive/>
                        </Row>
                        <Row>
                            <TextInput
                                ref="username"
                                type="email"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.__usernameHandleChange}
                                inputGroupLeft={<InputGroup.Addon><Col componentClass="i" className="glyphicon glyphicon-user"/></InputGroup.Addon>}
                                required
                                autofocus/>
                        </Row>
                        <Row>
                            <PasswordInput
                                ref="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.__passwordHandleChange}
                                inputGroupLeft={<InputGroup.Addon><Col componentClass="i" className="glyphicon glyphicon-lock"/></InputGroup.Addon>}
                                placeholder="Password"
                                required/>
                        </Row>
                        <Row>
                            <Col style={{ color: "red" }}> username: demo password:demo</Col>
                        </Row>
                        <Row>
                            <Button
                                className="btn btn-primary btn-login btn-block"
                                type="submit"
                                ref="submitBtn"
                                onClick={this.handleSubmit}>Login
                            </Button>
                        </Row>
                    </Form>
                </Card>
            </div>
        );
    }

    __handleChange(code:any, e:Object):boolean {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[code] = value;
        this.setState(state);
        return true;
    }

    handleSubmit() {
        if (this.state.username === "demo" && this.state.password === "demo") {
            cookie.save("domain", "http://0.0.0.1:8080/", {path: "/"});
            cookie.save("username", this.state.username.trim(), {path: "/"});
            cookie.save("password", this.state.password.trim(), {path: "/"});

            location.reload();
        }
    }
}

module.exports = Login;
