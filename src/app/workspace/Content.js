import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Header from "app/header/Header";
import SideMenu from "robe-react-ui/lib/sidemenu/SideMenu";
import Col from "react-bootstrap/lib/Col";
import Card from "libs/card/Card";

export default class Content extends ShallowComponent {

    constructor(props:Object) {
        super(props);
        this.state = {
            toggled: false
        };
    }

    render():Object {
        let toggled = this.state.toggled == false ? 0 : 290;
        return (
            <Col>
                <Header toggled={this.state.matches}
                        onToggle={this.__changeMenu}/>
                <Col id="sideMenu"
                     style={{width:toggled}}
                     className="side-menu">
                    <Card style={{marginLeft:0,marginRight:0}}>
                        <SideMenu
                            items={this.props.menu[0]}
                            selectedItem={"Dashboard"}
                            onChange={this.__handleChange}/>
                    </Card>
                </Col>
                <Col
                    id="content"
                    className="content"
                    style={{ height:window.innerHeight,marginLeft:toggled,marginRight:-1*toggled }}
                    onClick={this.__closeMenu}>
                    {this.props.content}
                </Col>
            </Col>
        );
    }

    __handleChange = (item:Object)=> {
        this.props.router.push(item.module);
    };

    __closeMenu = ()=> {
        if (this.state.matches == true) {
            this.setState({
                toggled: false
            });
        }
    };
    __changeMenu = ()=> {
        if (this.state.matches == true) {
            this.setState({
                toggled: !this.state.toggled
            });
        }
    };

    __mediaQueryChanged = (mql)=> {
        this.setState({
            toggled: !mql.matches,
            matches: mql.matches
        });

    };

    componentWillMount() {
        const mql = window.matchMedia("screen and (max-width: 768px)");
        mql.addListener(this.__mediaQueryChanged);
        this.setState({matches: mql.matches, toggled: !mql.matches});

        this.props.router.listen(this.__closeMenu);

        let initialSelection = window.location.pathname.slice(window.location.pathname.lastIndexOf("/") + 1);
        if (initialSelection) {
            this.props.router.push(initialSelection);
        }
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.__mediaQueryChanged);
        this.props.router.listen(null);
    }
}
