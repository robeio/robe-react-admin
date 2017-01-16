import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Card from "app/card/Card";

export default class Welcome extends ShallowComponent {
    render():Object {
        return (
            <Card header="Robe React Admin Panel Sample">
                <p>Welcome to panel. Use menu for natigate another page.</p>
            </Card>
        );
    }
}
