import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Router from "react-router/lib/Router";
import BrowserHistory from "react-router/lib/browserHistory";

class HasAuthorization extends ShallowComponent {

    ROUTES = [];

    constructor(props) {
        super(props);
    }

    render() {
        this.ROUTES = [];
        let routes = this.__wrap(this.props.menu);
        return (<Router key="root" history={BrowserHistory} onUpdate={() => window.scrollTo(0, 0)} routes={routes}/>);
    }

    __wrap = (routes) => {

        const INDEX_ROUTE = {
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require("app/workspace/WelcomePage"))
                })
            }
        };

        const NOT_FOUND_ROUTE = {
            path: "*",
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require("app/Common/NotFound"))
                })
            }
        };
        const items = routes[0].items;
        this.__getItems(items);


        this.ROUTES.push(NOT_FOUND_ROUTE);

        return ({
            menu: routes,
            path: window.applicationRootPath,
            component: require("app/workspace/Workspace"),
            indexRoute: INDEX_ROUTE,
            childRoutes: this.ROUTES
        });
    };

    __getItems = (items) => {
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.items && item.items.length > 0) {
                this.__getItems(item.items);
            } else {
                const path = this.__normalizePath(item.path);
                let obj = {
                    path: item.module,
                    getComponent(location, cb) {
                        require.ensure([], (require) => {
                            cb(null, require(path))
                        })
                    }
                };
                this.ROUTES.push(obj);
            }

        }
    };

    /**
     * this function changing absolute path to relative path
     */
    __normalizePath = (path) => {

        if (path)
            return path.replace("app", ".");

        return path;
    };

}

module.exports = HasAuthorization;