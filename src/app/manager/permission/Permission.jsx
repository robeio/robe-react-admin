import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import SelectInput from "robe-react-ui/lib/inputs/SelectInput";
import Card from "app/card/Card";
import Arrays from "robe-react-commons/lib/utils/Arrays";
import Toast from "robe-react-ui/lib/toast";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Button from "react-bootstrap/lib/Button";
import Col from "react-bootstrap/lib/Col";
import ListGroup from "react-bootstrap/lib/ListGroup";
import ListGroupItem from "react-bootstrap/lib/ListGroupItem";
import Row from "react-bootstrap/lib/Row";
import CheckInput from "robe-react-ui/lib/inputs/CheckInput";
import CheckTree from "robe-react-ui/lib/checktree/CheckTree";
import AjaxRequest from "robe-react-commons/lib/connections/AjaxRequest";


export default class Permission extends ShallowComponent {

    constructor(props) {
        super(props);

        this.state = {
            roleData: [],
            groupData: [],
            menuData: {},
            serviceData: [],
            selectedRole: null,
            selectedGroup: [],
            selectedServices: [],
            selectedMenus: []
        };
    }

    render() {
        var itemArr = [];
        for (let index in this.state.groupData) {
            var item = this.state.groupData[index];
            if (item.group != "")
                itemArr.push(<ListGroupItem key={index}
                                            onClick={this.__onGroupsSelection.bind(this,item["group"])}>{item["group"]}</ListGroupItem>);
        }

        return (
            <Card header="İzin Yönetimi">
                <Row>
                    <Col md={4}>
                        <SelectInput
                            label="Rol"
                            items={this.state.roleData}
                            value={this.state.selectedRole}
                            placeHolder="<Lütfen Seçiniz>"
                            textField={"name"}
                            valueField={"oid"}
                            onChange={this.__onRoleChange}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <Row>
                            <Col md={12}>
                                <span style={{fontWeight:"bold"}}>Sistemde Mevcut Olan İzin Grupları</span>
                                <Col
                                    style={{height:250,border:"1px solid #ddd",borderRadius:4,marginTop:4,overflowY:"auto"}}>
                                    <ListGroup style={{marginBottom:0}}>{itemArr}</ListGroup>
                                </Col>
                            </Col>
                        </Row>
                        <Row style={{marginTop:10}}>
                            <Col md={12}>
                                <span style={{fontWeight:"bold"}}>Seçili gruba ait servisler</span>
                                <Col
                                    style={{
                                        height:250,
                                        border:"1px solid #ddd",
                                        paddingLeft:10,
                                        borderRadius:4,
                                        marginTop:4,
                                        overflowY:"auto"}}>
                                    <CheckInput
                                        items={this.state.serviceData}
                                        value={this.state.selectedServices}
                                        textField="description"
                                        valueField="oid"
                                        formControl={false}
                                        style={{height:"240px",overflowY:"auto",overflowX:"hidden"}}
                                        onChange={this.__onServiceChange.bind(this, "selectedServices")}/>
                                </Col>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <span style={{fontWeight:"bold"}}>İzinli Menüler</span>
                        <Col style={{height:530,border:"1px solid #ddd",borderRadius:4,marginTop:4,overflowY:"auto"}}>
                            <CheckTree
                                ref="checkTree"
                                items={this.state.menuData}
                                value={this.state.selectedMenus}
                                textField="text"
                                valueField="oid"
                                childrenField="items"
                                onChange={this.__onMenuChange}/>
                        </Col>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12}>
                        <ButtonToolbar className="pull-right">
                            <Button onClick={this.__onClearClick}
                                    disabled={this.state.selectedRole==null}>İptal</Button>
                            <Button bsStyle="primary" onClick={this.__onSaveClick}
                                    disabled={this.state.selectedRole==null}>Kaydet</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>


            </Card>
        );
    }

    __onServiceChange = (code, e) => {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[code] = value;
        this.setState(state);
        return true;
    };

    __onRoleChange = (e)=> {
        let selectedRole = e.target.parsedValue;
        this.setState({selectedRole: selectedRole});
        if (selectedRole) {
            this.__readGroups(selectedRole);
            this.__readRolePermissions(selectedRole);
        }
    };

    __onMenuChange = (e:Object)=> {
        // let value = this.state.selectedMenus;
        // if (checked) {
        //     value.push(checkValue);
        // } else {
        //     Arrays.remove(value, checkValue);
        // }
        this.setState({
            selectedMenus: this.refs.checkTree.getSelectedItems()
        });
    };

    __readRolePermissions = (id)=> {
        let readRequest = new AjaxRequest({
            url: "roles/" + id + "/permissions",
            type: "GET"
        });

        readRequest.call(undefined, undefined,
            function (res) {
                this.setState({
                    selectedGroup: Arrays.extractValueArray(res.service, "group"),
                    selectedMenus: Arrays.extractValueArray(res.menu, "oid"),
                    selectedServices: Arrays.extractValueArray(res.service, "oid")

                });
            }.bind(this));

    };

    __onGroupsSelection = (value)=> {

        if (value && value.length > 0) {
            this.__readGroupMenuAndService(value);
        } else {
            this.setState({
                serviceData: []
            });
        }

    };
    __readGroupMenuAndService = (value)=> {

        let readRequest = new AjaxRequest({
            url: "permissions/group/" + value,
            type: "GET"
        });

        readRequest.call(undefined, undefined, function (res) {
            this.setState({
                serviceData: res.service
            });
        }.bind(this));
    };


    __onSaveClick = ()=> {

        let data = {};

        data.menus = this.state.selectedMenus;
        data.services = this.state.selectedServices;

        let readRequest = new AjaxRequest({
            url: "permissions/" + this.state.selectedRole,
            type: "POST"
        });

        readRequest.call(data, undefined,
            function (res) {
                Toast.success("Bilgiler başarıyla güncellendi.");
            }.bind(this),
            function (res) {
                if (res.status == 200)
                    Toast.success("Bilgiler başarıyla güncellendi.");
                else
                    Toast.error("Bilgiler güncellenemedi.");
            }.bind(this));
    };

    __onClearClick = ()=> {
        this.setState({
            selectedServices: [],
            selectedMenus: [],
            serviceData: [],
            groupData: [],
            selectedRole: undefined
        });
    };

    __readRoles = ()=> {
        let readRequest = new AjaxRequest({
            url: "roles",
            type: "GET"
        });

        readRequest.call(undefined, undefined, function (res) {
            this.setState({
                roleData: res
            });
        }.bind(this));
    };


    __readMenu = ()=> {
        let readRequest = new AjaxRequest({
            url: "permissions/menus",
            type: "GET"
        });

        readRequest.call(undefined, undefined, function (res) {
            this.setState({
                menuData: res
            });
        }.bind(this));
    };

    __readGroups = ()=> {
        let readRequest = new AjaxRequest({
            url: "services/groups",
            type: "GET"
        });

        readRequest.call(undefined, undefined, function (res) {
            this.setState({
                groupData: res,
                serviceData: []
            });
        }.bind(this));
    };

    componentDidMount() {
        this.__readMenu();
        this.__readRoles();
    };

    shouldComponentUpdate() {
        return true;
    }

}