import React from "react";
import {ShallowComponent, AjaxRequest} from "robe-react-commons";
import HasAuthorization from "./HasAuthorization";
import NoAuthorization from "./NoAuthorization";
import ToastContainer from "robe-react-ui/lib/toast/ToastContainer";
import Toast from "robe-react-ui/lib/toast/Toast";
import Progress from "robe-react-ui/lib/progress/Progress";
import cookie from "react-cookie";
import ajax from "robe-ajax";

export default class Switch extends ShallowComponent {
    constructor(props:Object) {
        super(props);

        let username = cookie.load("username");
        let me = this;
        ajax.ajaxSetup({
            complete: function (jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 401:
                        cookie.remove("username");
                        me.setState({hasAuth: false});
                        break;
                    case 403:
                        Toast.error("Yeki Hatası !");
                        break;
                    case 404 :
                        Toast.error("Sayfa bulunamadı ! ");
                        break;
                        break;
                    case 422 :
                        Toast.error("Verilerinizi kontrol ediniz.");
                        break;
                    case 500:
                        Toast.error("Sistem Hatası");
                        break;

                }
            }
        });

        this.state = {
            hasAuth: (username && username.trim() !== ""),
            menu: undefined
        };
    }

    render():Object {
        let content;
        if (!this.state.hasAuth) {
            Progress.done();
            content = <NoAuthorization />;
        }
        else if (!this.state.menu) {
            Progress.start();
            content = <span/>;
        }
        else {
            Progress.done();
            content = <HasAuthorization menu={this.state.menu}/>;
        }

        return (
            <div>
                <ToastContainer/>
                {content}
            </div>
        );

    }

    componentDidMount() {
        let readRequest = new AjaxRequest({
            url: "menus/user",
            type: "GET"
        });

        readRequest.call(undefined, undefined,
            (response:Object) => {
                this.setState({menu: response, hasAuth: true});
            },
            (error:Object) => {
                this.setState({menu: undefined, hasAuth: false});
            });
    }
}
