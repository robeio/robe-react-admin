import BaseCrudPage from "app/common/BaseCrudPage";
import SystemParameterModel from "./SystemParameterModel.json";

export default class SystemParameter extends BaseCrudPage {
    constructor() {
        let state = {};
        state.url = "http://localhost:3000/systemparameters";
        state.idField = "id";
        state.fields = SystemParameterModel.fields;
        state.description = "Description of SystemParameter";
        state.header = "System Parameter";
        super(state);
    }
}
