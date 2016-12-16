import BaseCrudPage from "app/common/BaseCrudPage";
import MenuModel from "./MenuModel.json";

export default class Menu extends BaseCrudPage {
    constructor() {
        let state = {};
        state.url = "http://localhost:3000/menuList";
        state.idField = "id";
        state.fields = MenuModel.fields;
        state.description = "Description of menu management";
        state.header = "Menu Management";
        super(state);
    }
}
