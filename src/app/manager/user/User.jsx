import BaseCrudPage from "app/common/BaseCrudPage";
import UserModel from "./UserModel.json";
import AjaxRequest from "robe-react-commons/lib/connections/AjaxRequest";

export default class User extends BaseCrudPage {
    constructor() {
        let state = {};
        state.url = "http://localhost:3000/users";
        state.idField = "id";
        state.fields = UserModel.fields;
        state.description = "Kullanıcıların listelenmesini ve Kullanıcı ile ilgili işlemlerin yönetilmesini sağlar.";
        state.header = "Kullanıcı Yönetimi";
        state.propsOfFields = {};
        super(state);
    }

    componentDidMount() {
        let readRequest = new AjaxRequest({
            url: "http://localhost:3000/roles",
            type: "GET"
        });
        readRequest.call(undefined, undefined, (response:Object) => {
            let propsOfFields = this.state.propsOfFields;
            propsOfFields.roleOid = {items: response};
            this.setState({propsOfFields: propsOfFields});
            this.forceUpdate();
        });
    }
}
