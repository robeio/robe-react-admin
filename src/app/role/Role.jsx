import BaseCrudPage from "../common/BaseCrudPage";
import RoleModel from "./RoleModel.json";

export default class Role extends BaseCrudPage {
    constructor(props: Object) {
        let state = {};
        state.url = "http://localhost:3000/systemparameters";
        state.idField = "id";
        state.fields = RoleModel.fields;
        state.description = "Description of Role";
        state.header = "Role Management";
        super(state);
    }
}