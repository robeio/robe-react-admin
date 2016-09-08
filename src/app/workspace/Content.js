import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Header from "app/workspace/Header";
import SideMenu from "robe-react-ui/lib/sidemenu/SideMenu";
import Col from "react-bootstrap/lib/Col";

export default class Content extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        this.state = {
            toggled: false,
            windowHeight: window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight
        };
    }

    render(): Object {
        let toggled = this.state.toggled ? "toggled" : "toogled";
        return (
            <Col>
                <Header open={this.__onMenuOpenClick} />
                <Col id="wrapper" className={toggled}>
                    <Col id="sidebar-wrapper">
                        <Col className="SideMenu-wrapper">
                            <SideMenu items={this.props.menu[0]} selectedItem={"Dashboard"} onChange={this.handleChange} />
                        </Col>
                    </Col>
                    <Col style={{ height: this.state.windowHeight, overflowY: "auto" }}>
                        <Col id="page-content-wrapper" onClick={this.__onPageClick}>
                            {this.props.content}
                        </Col>
                    </Col>
                </Col>
            </Col>
        );
    }

    handleChange(item: Object) {
        this.props.router.push(item.module);
    }

    __onPageClick(ev: Object) {
        if (this.state.toggled) {
            this.setState({
                toggled: false
            });
        }
        ev.preventDefault();
    }
    __onMenuOpenClick(ev: Object) {
        this.setState({
            toggled: !this.state.toggled
        });
        ev.preventDefault();
    }


    __mediaQueryChanged() {
        if (!this.state.mql.matches) {
            this.setState({
                toggled: false
            });
        }
    }
    handleResize() {
        this.setState({
            windowHeight: window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight
        });
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }

    __listen() {
        if (this.state.mql) {
            this.setState({
                toggled: false
            });
        }
    }

    componentWillMount() {
        const mql = window.matchMedia("screen and (max-width: 768px)");
        mql.addListener(this.__mediaQueryChanged);
        this.setState({ mql: mql });
        this.props.router.listen(this.__listen);

        let initialSelection = window.location.pathname.slice(window.location.pathname.lastIndexOf("/") + 1);
        if (initialSelection) {
            this.props.router.push(initialSelection);
        }
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.__mediaQueryChanged);
        this.props.router.listen(null);
        window.removeEventListener("resize", this.handleResize);
    }
}
