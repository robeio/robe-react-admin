import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Header from "app/workspace/Header";
import SideMenu from "robe-react-ui/lib/sidemenu/SideMenu";
import Col from "react-bootstrap/lib/Col";

class Content extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            toggled: false,
            value: undefined,
            windowHeight: window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight
        };
    };

    render() {
        var toggled = this.state.toggled ? "toggled" : "toogled";
        return (
            <Col>
                <Header open={this.__onMenuOpenClick}/>
                <Col id="wrapper" className={toggled}>
                    <Col id="sidebar-wrapper">
                        <SideMenu items={this.props.menu[0]} value={this.state.value} onChange={this.handleChange.bind(this)}/>
                    </Col>
                    <Col style={{height:this.state.windowHeight,overflowY:"auto"}}>
                        <Col id="page-content-wrapper" onClick={this.__onPageClick}>
                            {this.props.content}
                        </Col>
                    </Col>
                </Col>
            </Col>
        );
    };

    handleChange = (item: Object) => {
        this.props.router.push(item.module);
    };

    __onPageClick = (ev)=> {

        if (this.state.toggled)
            this.setState({
                toggled: false
            });
        ev.preventDefault();
    };
    __onMenuOpenClick = (ev)=> {
        this.setState({
            toggled: !this.state.toggled
        });
        ev.preventDefault();
    };


    __mediaQueryChanged = () => {
        if (!this.state.mql.matches) {
            this.setState({
                toggled: false
            });
        }
    };
    handleResize = (e)=> {
        this.setState({
            windowHeight: window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight
        });
    };

    componentDidMount = ()=> {
        window.addEventListener('resize', this.handleResize);
    };

    componentWillMount = () => {
        const mql = window.matchMedia("screen and (max-width: 768px)");
        mql.addListener(this.__mediaQueryChanged);
        this.setState({mql: mql});
        this.props.router.listen(function (location) {
            if (this.state.mql) {
                this.setState({
                    toggled: false
                });
            }
        }.bind(this));
    };

    componentWillUnmount = () => {
        this.state.mql.removeListener(this.__mediaQueryChanged);
        this.props.router.listen(null);
        window.removeEventListener('resize', this.handleResize);

    };

}

module.exports = Content;