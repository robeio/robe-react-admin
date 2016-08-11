import BaseCrudPage from "../common/BaseCrudPage";
import UserModel from "./UserModel.json";

export default class Role extends BaseCrudPage {
    constructor(props: Object) {
        let state = {};
        state.url = "http://localhost:3000/users";
        state.idField = "id";
        state.fields = UserModel.fields;
        state.description = "Kullanıcıların listelenmesini ve Kullanıcı ile ilgili işlemlerin yönetilmesini sağlar.";
        state.header = "Kullanıcı Yönetimi";
        super(state);
    }
}