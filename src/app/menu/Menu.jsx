import BaseCrudPage from "../common/BaseCrudPage";
import MenuModel from "./MenuModel.json";

export default class Menu extends BaseCrudPage {
    constructor(props: Object) {
        let state = {};
        state.url = "http://localhost:3000/menuList";
        state.idField = "id";
        state.fields = MenuModel.fields;
        state.description = "Description of menu management";
        state.header = "Menu Management";
        super(state);
    }
}