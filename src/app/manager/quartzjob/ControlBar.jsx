import React from "react";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";
import { ButtonGroup, Button } from "react-bootstrap";
import AjaxRequest from "robe-react-commons/lib/connections/AjaxRequest";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";

export default class QuartzJob extends ShallowComponent {
    static propTypes: Map = {
        item: React.PropTypes.object,
        paused: React.PropTypes.bool,
        scheduled: React.PropTypes.bool,
        onChange: React.PropTypes.func.isRequired,
        servicePath: React.PropTypes.string.isRequired
    };

    static defaultProps: Map = {
        paused: false,
        scheduled: true
    }


    render(): Object {
        return (
            <ButtonGroup className="pull-right" bsSize="xs">
                {this.props.item.status !== "UNSCHEDULED" ?
                    (this.props.item.status === "PAUSED" ?
                        <Button title="Resume" name="resume" onClick={this.__onClick}><FaIcon code="fa-play" /></Button> :
                        <Button title="Pause" bsStyle="warning" name="pause" onClick={this.__onClick}><FaIcon code="fa-pause" /></Button>) :
                    undefined}
                { this.props.item.status !== "UNSCHEDULED" ?
                    <Button title="Unschedule" bsStyle="danger" name="unschedule" onClick={this.__onClick}><FaIcon code="fa-calendar-minus-o" /></Button> :
                    <Button title="Schedule" name="schedule" onClick={this.__onClick}><FaIcon code="fa-calendar-plus-o" /></Button>}
            </ButtonGroup>
        );
    }

    __onClick(e: Object) {
        let name = e.target.name || e.target.parentElement.name;
        let req = new AjaxRequest({
            url: `${this.props.servicePath}/${this.props.item.oid}/${name}`,
            type: "PUT"
        });
        req.call(undefined, undefined, this.__onSuccess, this.__onError);
    }
    __onSuccess(xhr: Object) {
        if (xhr) {
            if (this.props.onChange) {
                this.props.onChange();
            }
        }
    }
    __onError(xhr: Object, error: string) {
        console.log(error);
    }
}
