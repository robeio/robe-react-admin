import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Router from "react-router/lib/Router";
import BrowserHistory from "react-router/lib/browserHistory";
import Workspace from "app/workspace/Workspace";

export default class HasAuthorization extends ShallowComponent {

    static ROUTES = [];
    static ROUTER;

    constructor(props:Object) {
        super(props);
        HasAuthorization.ROUTER = HasAuthorization.createRoutes(this.props.menu);
    }

    render():Object {
        return (<Router key="root"
                        history={BrowserHistory}
                        onUpdate={HasAuthorization.scrollTop}
                        routes={HasAuthorization.ROUTER}/>);
    }

    static createRoutes(menu:Object):Object {
        const INDEX_ROUTE = {
            getComponent(location:string, cb:Function) {
                require.ensure([], (require:Object) => {
                    cb(null, HasAuthorization.importComponent(require("./welcome/Welcome")));
                });
            }
        };

        const NOT_FOUND_ROUTE = {
            path: "*",
            getComponent(location:string, cb:Function) {
                require.ensure([], (require:Object) => {
                    cb(null, HasAuthorization.importComponent(require("./common/NotFound")));
                });
            }
        };
        const items = menu[0].items;
        HasAuthorization.importMenu(items);
        HasAuthorization.ROUTES.push(NOT_FOUND_ROUTE);

        return ({
            menu: menu,
            path: window.applicationRootPath,
            component: Workspace,
            indexRoute: INDEX_ROUTE,
            childRoutes: HasAuthorization.ROUTES
        });
    }

    static importMenu(items:Array) {
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.items && item.items.length > 0) {
                HasAuthorization.importMenu(item.items);
            } else {
                const path = HasAuthorization.normalizePath(item.path);

                let obj = {
                    path: item.module,
                    getComponent(location:string, cb:Function) {
                        require.ensure([], (require:Object) => {
                            cb(null, HasAuthorization.importComponent(require(path)));
                        });
                    }
                };
                HasAuthorization.ROUTES.push(obj);
            }
        }
    }

    static importComponent(component:Object):Object {
        if (component.default) {
            return component.default;
        }
        return component;
    }

    /**
     * this function changing absolute path to relative path
     */
    static normalizePath(path:string):string {
        console.log(path);
        let temp;
        if (path) {
            temp = path.replace("modules", "manager");
            return temp.replace("app", ".");
        }
        return path;
    }

    static scrollTop() {
        window.scrollTo(0, 0);
    }

}
