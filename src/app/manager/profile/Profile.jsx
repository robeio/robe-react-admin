import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import AjaxRequest from "robe-react-commons/lib/connections/AjaxRequest";
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Card from "app/card/Card";// eslint-disable-line import/no-unresolved

export default class Profile extends ShallowComponent {

    constructor(props: Object) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            email: ""
        };
    }

    render(): Object {
        return (
            <Card description={"Description of profile"} header={"Profile"}>
                <Row>
                    <Col lg={12}>
                        <TextInput label="Name" value={this.state.name} readOnly />
                        <TextInput label="Surname" value={this.state.surname} readOnly />
                        <TextInput label="Email" value={this.state.email} readOnly />
                    </Col>
                </Row>
            </Card>
        );
    }

    componentDidMount() {
        let readRequest = new AjaxRequest({
            url: "http://localhost:3000/profiles/1",
            type: "GET"
        });

        readRequest.call(undefined, undefined, (response: Object) => {
            this.setState({
                name: response.name,
                surname: response.surname,
                email: response.email,
            });
        });
    }
}
