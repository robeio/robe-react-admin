import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Router from "react-router/lib/Router";
import BrowserHistory from "react-router/lib/browserHistory";
import Workspace from "./workspace/Workspace";

export default class HasAuthorization extends ShallowComponent {

    ROUTES = [];
    static importComponent(component: Object): Object {
        if (component.default) {
            return component.default;
        }
        return component;
    }
    render(): Object {
        this.ROUTES = [];
        let routes = this.__wrap(this.props.menu);
        return (<Router key="root" history={BrowserHistory} onUpdate={this.__scrollTop} routes={routes} />);
    }

    __wrap(routes: Object): Object {
        const INDEX_ROUTE = {
            getComponent(location: string, cb: Function) {
                require.ensure([], (require: Object) => {
                    cb(null, HasAuthorization.importComponent(require("./workspace/WelcomePage")));
                });
            }
        };

        const NOT_FOUND_ROUTE = {
            path: "*",
            getComponent(location: string, cb: Function) {
                require.ensure([], (require: Object) => {
                    cb(null, HasAuthorization.importComponent(require("./common/NotFound")));
                });
            }
        };
        const items = routes[0].items;
        this.__getItems(items);
        this.ROUTES.push(NOT_FOUND_ROUTE);

        return ({
            menu: routes,
            path: window.applicationRootPath,
            component: Workspace,
            indexRoute: INDEX_ROUTE,
            childRoutes: this.ROUTES
        });
    }

    __getItems(items: Array) {
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.items && item.items.length > 0) {
                this.__getItems(item.items);
            } else {
                const path = this.__normalizePath(item.path);
                let obj = {
                    path: item.module,
                    getComponent(location: string, cb: Function) {
                        require.ensure([], (require: Object) => {
                            cb(null, HasAuthorization.importComponent(require(path)));
                        });
                    }
                };
                this.ROUTES.push(obj);
            }
        }
    }

    /**
     * this function changing absolute path to relative path
     */
    __normalizePath(path: string): string {
        if (path) {
            return path.replace("app", ".");
        }
        return path;
    }

    __scrollTop() {
        window.scrollTo(0, 0);
    }
}
